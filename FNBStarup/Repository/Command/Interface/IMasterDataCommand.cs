using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Command.Interface
{
    public interface IMasterDataCommand
    {
        Task<ActionResult<IEnumerable<SI_City>>> GetListCities();
        Task<ActionResult<IEnumerable<SI_District>>> GetListDistricts();
        Task<ActionResult<IEnumerable<PO_ProductType>>> GetListProductType();
        Task<ActionResult<IEnumerable<SI_Unit>>> GetPurchaseUnit();
    }
}
