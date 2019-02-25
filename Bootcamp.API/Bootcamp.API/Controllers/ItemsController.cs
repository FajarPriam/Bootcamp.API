using BussinessLogic.Service;
using DataAccess.Model;
using DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Bootcamp.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ItemsController : ApiController
    {
        private readonly IItemService _itemService;
        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        // GET: api/Items
        public IEnumerable<Item> Get()
        {
            return _itemService.Get();
        }

        // GET: api/Items/5
        public Item Get(int id)
        {
            return _itemService.Get(id);
        }

        // POST: api/Items
        public void Post(ItemParam itemParam)
        {
            _itemService.Insert(itemParam);
        }

        // PUT: api/Items/5
        public void Put(int id, ItemParam itemParam)
        {
            _itemService.Update(id, itemParam);
        }

        // DELETE: api/Items/5
        public void Delete(int id)
        {
            _itemService.Delete(id);
        }
    }
}
