using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Repository.Command.Interface;

namespace Repository.Command.Respository
{
    public class MasterDataCommand : IMasterDataCommand
    {
        private readonly ApplicationDbContext _context;
        public MasterDataCommand(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<SI_City>>> GetListCities()
        {
            // first we perform the filtering...
            var cities = _context.SI_City;
            // ... and then we call the ApiResult
            return await cities.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<SI_District>>> GetListDistricts()
        {
            // first we perform the filtering...
            var districts = _context.SI_District;
            // ... and then we call the ApiResult
            return await districts.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<PO_ProductType>>> GetListProductType()
        {
            // first we perform the filtering...
            var productType = _context.PO_ProductType;
            // ... and then we call the ApiResult
            return await productType.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<SI_Unit>>> GetPurchaseUnit()
        {
            // first we perform the filtering...
            var unit = _context.SI_Unit;
            // ... and then we call the ApiResult
            return await unit.ToListAsync();
        }
    }
}
