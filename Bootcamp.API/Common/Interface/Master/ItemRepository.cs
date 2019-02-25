using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Model;
using DataAccess.Param;

namespace Common.Interface.Master
{
    public class ItemRepository : IItemRepository
    {
        MyContext myContext = new MyContext();
        public bool Delete(int? Id)
        {
            var result = 0;
            Item item = Get(Id);
            item.IsDelete = true;
            item.DeleteDate = DateTimeOffset.Now.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Item> Get()
        {
            var get = myContext.Items.Where(x => x.IsDelete == false).ToList();
            return get;
        }

        public Item Get(int? Id)
        {
            Item item = myContext.Items.Where(x => x.Id == Id).SingleOrDefault();
            return item;
        }

        public bool Insert(ItemParam itemParam)
        {
            var result = 0;
            var item = new Item();
            item.Suppliers = myContext.Suppliers.Find(itemParam.Suppliers);
            item.Name = itemParam.Name;
            item.Stock = itemParam.Stock;
            item.Price = itemParam.Price;
            item.CreateDate = DateTimeOffset.Now.LocalDateTime;
            myContext.Items.Add(item);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Update(int? Id, ItemParam itemParam)
        {
            var result = 0;
            var get = Get(Id);
            get.Suppliers = myContext.Suppliers.Find(itemParam.Suppliers);
            get.Name = itemParam.Name;
            get.Stock = itemParam.Stock;
            get.Price = itemParam.Price;
            get.UpdateDate = DateTimeOffset.Now.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
