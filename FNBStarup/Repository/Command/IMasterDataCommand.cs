using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Command
{
    public interface IMasterDataCommand
    {
        Task<ActionResult<IEnumerable<SI_City>>> GetListCities(ApplicationDbContext _context);
        Task<ActionResult<IEnumerable<SI_District>>> GetListDistricts(ApplicationDbContext _context);
        Task<ActionResult<IEnumerable<PO_ProductType>>> GetListProductType(ApplicationDbContext _context);
    }
}
