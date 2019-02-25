$(document).ready(function () {
    LoadIndexSupplier();
    ClearScreen();
    //menerapkan datatable pada #table
    $('#table').DataTable({
        "ajax": LoadIndexSupplier()
    })
})

function LoadIndexSupplier() {
    
    $.ajax({
        types: "GET",
        //get data supplier
        url: "http://localhost:18957/api/Supplier",
        async: false,
        dataType: "json",
        success: function (data) {
            var html = '';
            //deklarasi variabel i untuk menampung 1
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                //menampilkan no urut
                html += '<td>' + i + '</td>';
                //menampilkan Nama Supplier
                html += '<td>' + val.Name + '</td>';
                //memanggil function edit menggunakan function GetById untuk mendapatkan id supplier
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')"></a>';
                //memanggil function delete 
                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')"></a> </td>';
                html += '</tr>';
                //penjumlahan no urut
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function Save() {
    //membuat objek baru supplier untuk menyimpan data
    var supplier = new Object();

    supplier.name = $('#Name').val();
    $.ajax({
        //data dilempar ke SupplierController melalui url
        url: 'http://localhost:18957/api/Supplier',
        //untuk mencari type function
        type: 'POST',
        //untuk menentukan type data yg dilempar
        dataType: 'json',
        //data yg dilempar berasal dari object supplier
        data: supplier,
        success: function (result) {
            LoadIndexSupplier();
            $('#myModal').modal('hide');
        }
    });
    ClearScreen();
}

function Edit() {
    var supplier = new Object();
    supplier.id = $('#Id').val();
    supplier.name = $('#Name').val();
    $.ajax({
        url: "http://localhost:18957/api/Supplier/" + $('#Id').val(),
        data: supplier,
        type: "PUT",
        dataType: "json",
        success: function (result) {
            LoadIndexSupplier();
            $('#myModal').modal('hide');
            $('#Name').val('');
        }
    });
    ClearScreen();
}

function GetById(Id) {
    debugger;
    $.ajax({
        url: "http://localhost:18957/api/Supplier/" + Id,
        type: "GET",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    })
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
            url: "http://localhost:18957/api/Supplier/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Suppliers/Index/';
                });
            },
            error: function (response) {
                swal("Oops", "We couldn't connect to the server!", "error");
            }
        });
    });
}

function ClearScreen() {
    $('#Name').val('');
    $('#Id').val('');
    $('#Update').hide();
    $('#Save').show();
}