using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using Entities.Data.Model.PO;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.PO
{
    public interface IPOProductCommand
    {
        Task<ActionResult<IEnumerable<PO_Product>>> GetListProduct(ApplicationDbContext _context);
        Task<ActionResult<ApiResult<PO_Product>>> FindProduct([FromBody] QueryParamsModel<PO_Product> query, ApplicationDbContext _context);
        Task<ActionResult<PO_Product>> GetProductById(ApplicationDbContext _context, int productID);
        Task<ActionResult<PO_Product>> PutProduct(PO_Product product, ApplicationDbContext _context);
    }
}
