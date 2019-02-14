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
    [EnableCors(origins: "*", headers: "*", methods:"*")]
    public class SupplierController : ApiController
    {
        private readonly ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        // GET: api/Supplier
        public IEnumerable<Supplier> Get()
        {
            return _supplierService.Get();
        }

        // GET: api/Supplier/5
        public Supplier Get(int id)
        {
            return _supplierService.Get(id);
        }

        // POST: api/Supplier
        [HttpPost]
        public void Post(SupplierParam supplierParam)
        {
            _supplierService.Insert(supplierParam);
        }

        // PUT: api/Supplier/5
        public void Put(int id, SupplierParam supplierParam)
        {
            _supplierService.Update(id, supplierParam);
        }

        // DELETE: api/Supplier/5
        public void Delete(int id)
        {
            _supplierService.Delete(id);
        }
    }
}
