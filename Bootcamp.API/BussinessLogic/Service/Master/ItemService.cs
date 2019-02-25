using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Model;
using DataAccess.Param;
using Common.Interface;

namespace BussinessLogic.Service.Master
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        bool status = false;
        public bool Delete(int? Id)
        {
            if (Id == null)
            {
                Console.WriteLine("Insert Id");
                Console.Read();
            }
            else if (Id == ' ')
            {
                Console.WriteLine("Dont Insert Blank Caracter");
                Console.Read();
            }
            else
            {
                status = _itemRepository.Delete(Id);
                Console.WriteLine("Success");
            }
            return status;
        }

        public List<Item> Get()
        {
            return _itemRepository.Get();
        }

        public Item Get(int? Id)
        {
            var getItemId = _itemRepository.Get(Id);
            if (Id == null)
            {
                Console.WriteLine("Insert Id");
                Console.Read();
            }
            return getItemId;
        }

        public bool Insert(ItemParam itemParam)
        {
            if (itemParam == null)
            {
                Console.WriteLine("Insert Name");
                Console.Read();
            }
            else
            {
                status = _itemRepository.Insert(itemParam);
                Console.WriteLine("Success");
            }
            return status;
        }

        public bool Update(int? Id, ItemParam itemParam)
        {
            if (Id == null)
            {
                Console.WriteLine("Insert Id");
                Console.Read();
            }
            else if (Id == ' ')
            {
                Console.WriteLine("Dont Insert Blank Caracter");
                Console.Read();
            }
            else
            {
                status = _itemRepository.Update(Id, itemParam);
                Console.WriteLine("update Success");
            }
            return status;
        }
    }
}
