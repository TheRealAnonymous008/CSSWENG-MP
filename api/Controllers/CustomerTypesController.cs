using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerTypeController : GenericItemController<CustomerType, CustomerType>
    {
        public CustomerTypeController(AutoworksDBContext ctx) : base(new CustomerTypeRepository(ctx))
        {

        }

        [HttpGet("all")]
        public override IEnumerable<CustomerType> GetAll()
        {
            List<CustomerType> view = new List<CustomerType>();

            foreach (CustomerType type in repository.GetAll())
            {
                view.Add(type);
            }

            return view;
        }

        [HttpGet("filter")]
        public override IEnumerable<CustomerType> GetByPredicate(Predicate<CustomerType> predicate)
        {
            IEnumerable<CustomerType> filtered = GetAll();

            return filtered;
        }
    }
}