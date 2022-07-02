using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entities.Data.Model.PO;
using System.Linq;
using Repository.Command.Interface;
using static Entities.Data.Common.Common;

namespace Repository.Command.Respository
{
    public class POProductCommand : IPOProductCommand
    {
        private readonly ApplicationDbContext _context;
        private readonly IGenericCommand<PO_Product> _productCommand;
        public POProductCommand(ApplicationDbContext context, IGenericCommand<PO_Product> productCommand)
        {
            _context = context;
            _productCommand = productCommand;
        }

        public async Task<ActionResult<IReadOnlyList<PO_Product>>> GetListProduct()
        {
            // ... and then we call the ApiResult
            return await _productCommand.ListAllAsync();
        }

        public async Task<ActionResult<ApiResult<PO_Product>>> FindProduct([FromBody] QueryParamsModel<PO_Product> query)
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

        public async Task<ActionResult<PO_Product>> GetProductById(int productID)
        {
            return await _productCommand.GetByIdAsync(productID);
        }

        public async Task<ActionResult<PO_Product>> PostProduct(PO_Product product)
        {
            _productCommand.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<ActionResult<PO_Product>> PutProduct(PO_Product product)
        {
            var productUpdate = await _productCommand.GetByIdAsync(product.Id);
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

        public async Task<ActionResult<List<PO_Product>>> PutStatusListProduct(List<PO_Product> products, bool active)
        {
            foreach (var product in products) 
            {
                var productUpdate = await _productCommand.GetByIdAsync(product.Id);
                if (productUpdate != null)
                {
                    productUpdate.Active = active;
                }
            }
            
            await _context.SaveChangesAsync();

            return products;
        }

        public async Task<ActionResult<PO_Product>> DeleteProduct(PO_Product product)
        {
            CommonFunc.DeleteFileImage(product.FolderImage);
            _productCommand.Delete(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<bool> DeleteProducts(List<int> prodcutIdsForDelete)
        {
            foreach (var product in prodcutIdsForDelete)
            {
                var productDelete = await _productCommand.GetByIdAsync(product);
                CommonFunc.DeleteFileImage(productDelete.FolderImage);
                _productCommand.Delete(productDelete);
            }

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
