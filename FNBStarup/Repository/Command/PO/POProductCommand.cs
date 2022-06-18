using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entities.Data.Model.PO;
using static Entities.Data.Common.Common;
using System.Linq;

namespace Repository.Command.PO
{
    public class POProductCommand : IPOProductCommand
    {
        public async Task<ActionResult<IEnumerable<PO_Product>>> GetListProduct(ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var products = _context.PO_Product;
            // ... and then we call the ApiResult
            return await products.ToListAsync();
        }

        public async Task<ActionResult<ApiResult<PO_Product>>> FindProduct([FromBody] QueryParamsModel<PO_Product> query, ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var products = _context.PO_Product.AsQueryable();
            if (!string.IsNullOrEmpty(query.Filter.ProductName))
            {
                products = products.Where(c => c.ProductName.Contains(query.Filter.ProductName));
            }
            if (query.Filter.ProductTypeID > 0)
            {
                products = products.Where(c => c.ProductTypeID == query.Filter.ProductTypeID);
            }
            if (query.Filter.Active != null)
            {
                products = products.Where(c => c.Active == query.Filter.Active);
            }
            //products = products.Where(c => c.Active == query.Filter.Active);

            // ... and then we call the ApiResult
            return await ApiResult<PO_Product>.CreateAsync(
                    products,
                    query);
        }

        public async Task<ActionResult<PO_Product>> GetProductById(ApplicationDbContext _context, int productID)
        {
            return await _context.PO_Product.FindAsync(productID);
        }

        public async Task<ActionResult<PO_Product>> PostProduct(PO_Product product, ApplicationDbContext _context)
        {
            _context.PO_Product.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<ActionResult<PO_Product>> PutProduct(PO_Product product, ApplicationDbContext _context)
        {
            var productUpdate = await _context.PO_Product.FindAsync(product.Id);
            if (productUpdate != null)
            {
                productUpdate.ProductName = product.ProductName;
                productUpdate.ProductTypeID = product.ProductTypeID;
                productUpdate.DefaultPrice = product.DefaultPrice;
                productUpdate.DefaultUnit = product.DefaultUnit;
                productUpdate.Image = product.Image;
                productUpdate.Active = product.Active;
            }
            await _context.SaveChangesAsync();

            return productUpdate;
        }

        public async Task<ActionResult<PO_Product>> DeleteProduct(PO_Product product, ApplicationDbContext _context)
        {
            _context.PO_Product.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
