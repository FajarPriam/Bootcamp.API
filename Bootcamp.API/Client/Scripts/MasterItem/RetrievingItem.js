$(document).ready(function () {
    LoadIndexItem();
    HideAlert();
    LoadSupplierCombo();
    ClearScreen();
    //menerapkan datatable pada #table
    $('#table').DataTable({
        "ajax": LoadIndexItem()
    })
})

function LoadIndexItem() {

    $.ajax({
        types: "GET",
        //get data item
        url: "http://localhost:18957/api/Items/",
        async: false,
        dataType: "json",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';
                html += '<td>' + val.Price + '</td>';
                html += '<td>' + val.Stock + '</td>';
                html += '<td>' + val.Suppliers.Name + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')"></a>';
                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')"></a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadSupplierCombo() {
    $.ajax({
        url: 'http://localhost:18957/api/Supplier',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var supplier = $('#Suppliers');
            $.each(result, function (i, Supplier) {
                $("<option></option>").val(Supplier.Id).text(Supplier.Name).appendTo(supplier);
            });
        }
    });
}

function Save() {
    //membuat objek baru supplier untuk menyimpan data
    var item = new Object();

    item.name = $('#Name').val();
    item.price = $('#Price').val();
    item.stock = $('#Stock').val();
    item.suppliers = $('#Suppliers').val();
    $.ajax({
        //data dilempar ke SupplierController melalui url
        url: 'http://localhost:18957/api/Items/',
        //untuk mencari type function
        type: 'POST',
        //untuk menentukan type data yg dilempar
        dataType: 'json',
        //data yg dilempar berasal dari object supplier
        data: item,
        success: function (result) {
            LoadIndexItem();
            $('#myModal').modal('hide');
        }
    });
    ClearScreen();
}

function GetById(Id) {
    $.ajax({
        url: 'http://localhost:18957/api/Items/' + Id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Price').val(result.Price);
            $('#Stock').val(result.Stock);
            $('#Suppliers').val(result.Suppliers.Id);

            $('#myModal').modal('show');
            $('#Save').hide();
            $('#Update').show();
        }
    })
}

function Edit() {
    var item = new Object();
    item.Id = $('#Id').val();
    item.Name = $('#Name').val();
    item.Price = $('#Price').val();
    item.Stock = $('#Stock').val();
    item.Suppliers = $('#Suppliers').val();
    $.ajax({
        url: 'http://localhost:18957/api/Items/' + item.Id,
        type: 'PUT',
        data: item,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                window.location.href = '/Items/Index/';
                $('#Id').val('');
                $('#Name').val('');
                $('#Price').val('');
                $('#Stock').val('');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
    ClearScreen();
}

function Delete(Id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "http://localhost:18957/api/Items/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Items/Index/';
                });
            },
            error: function (response) {
                swal("Oops", "We couldn't connect to the server!", "error");
            }
        });
    });
}

function ValidationInsert() {
    debugger;
    var isAllValid = true;
    if ($('#Name').val() == "" || ($('#Name').val() == " " )) {
        isAllValid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Price').val() == "" || ($('#Price').val() == " " )) {
        isAllValid = false;
        $('#Price').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Stock').val() == "" || ($('#Stock').val() == " ")) {
        isAllValid = false;
        $('#Stock').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Suppliers').val() == "Choose Supplier") {
        isAllValid = false;
        $('#Suppliers').siblings('span.error').css('visibility', 'visible');
    }

    if (isAllValid) {
        Save();
    }

}

function ValidationEdit() {
    var isAllValid = true;
    if ($('#Name').val() == "" || ($('#Name').val() == " ")) {
        isAllValid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Price').val() == "" || ($('#Price').val() == " ")) {
        isAllValid = false;
        $('#Price').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Stock').val() == "" || ($('#Stock').val() == " ")) {
        isAllValid = false;
        $('#Stock').siblings('span.error').css('visibility', 'visible');
    }

    if ($('#Suppliers').val() == "Choose Supplier") {
        isAllValid = false;
        $('#Suppliers').siblings('span.error').css('visibility', 'visible');
    }

    if (isAllValid) {
        Edit();
    }

}

function HideAlert() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Price').siblings('span.error').css('visibility', 'hidden');
    $('#Stock').siblings('span.error').css('visibility', 'hidden');
    $('#Suppliers').siblings('span.error').css('visibility', 'hidden');
}

function ClearScreen() {
    $('#Name').val('');
    $('#Id').val('');
    $('#Price').val('');
    $('#Stock').val('');
    $('#Suppliers').val('Choose Supplier');
    $('#Update').hide();
    $('#Save').show();
    HideAlert();
}