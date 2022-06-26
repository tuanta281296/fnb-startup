using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using Entities.Data.Model.PO;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Interface
{
    public interface IPOProductCommand
    {
        Task<ActionResult<IEnumerable<PO_Product>>> GetListProduct();
        Task<ActionResult<ApiResult<PO_Product>>> FindProduct([FromBody] QueryParamsModel<PO_Product> query);
        Task<ActionResult<PO_Product>> GetProductById(int productID);
        Task<ActionResult<PO_Product>> PostProduct(PO_Product product);
        Task<ActionResult<PO_Product>> PutProduct(PO_Product product);
        Task<ActionResult<PO_Product>> DeleteProduct(PO_Product product);
        Task<ActionResult<List<PO_Product>>> PutStatusListProduct(List<PO_Product> products, bool active);
        Task<bool> DeleteProducts(List<int> prodcutIdsForDelete);
    }
}
