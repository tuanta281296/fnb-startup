using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Command
{
    public class MasterDataCommand : IMasterDataCommand
    {
        public async Task<ActionResult<IEnumerable<SI_City>>> GetListCities(ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var cities = _context.SI_City;
            // ... and then we call the ApiResult
            return await cities.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<SI_District>>> GetListDistricts(ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var districts = _context.SI_District;
            // ... and then we call the ApiResult
            return await districts.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<PO_ProductType>>> GetListProductType(ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var productType = _context.PO_ProductType;
            // ... and then we call the ApiResult
            return await productType.ToListAsync();
        }
    }
}
