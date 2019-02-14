using BussinessLogic.Service;
using BussinessLogic.Service.Master;
using Common.Interface;
using Common.Interface.Master;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace Bootcamp.API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // this is service area
            container.RegisterType<ISupplierService, SupplierService>();

            // this is repository area
            container.RegisterType<ISupplierRepository, SupplierRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}