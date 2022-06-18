using Entities.Data;
using Entities.Data.Model.PO;
using LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Repository.Command;
using Repository.Command.PO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace FNBStartup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IConfiguration _config;
        private readonly IPOProductCommand _poProductCommand;
        private ILoggerManager _logger;
        public POProductController(ApplicationDbContext context, IPOProductCommand poProductCommand, IConfiguration config, ILoggerManager logger)
        {
            _context = context;
            _poProductCommand = poProductCommand;
            _config = config;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct()
        {
            var roleUsers = await _poProductCommand.GetListProduct(_context);
            return Ok(roleUsers.Value);
        }

        [HttpPost, Route("find")]
        public async Task<ActionResult<ApiResult<IActionResult>>> FindProduct([FromBody] QueryParamsModel<PO_Product> query)
        {
            var roleUsers = await _poProductCommand.FindProduct(query, _context);
            return Ok(roleUsers.Value);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<PO_Product>> GetUsersByUsersID(int productId)
        {
            var product = await _poProductCommand.GetProductById(_context, productId);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        #region Save And Delete

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<PO_Product>> PutProduct(PO_Product product)
        {
            await _poProductCommand.PutProduct(product, _context);
            return CreatedAtAction("FindProduct", new { id = product.Id }, product);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PO_Product>> PostRoles(PO_Product product)
        {
            await _poProductCommand.PostProduct(product, _context);
            return CreatedAtAction("FindRoles", new { id = product.Id }, product);
        }

        [HttpDelete("{productId}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _context.PO_Product.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }

            await _poProductCommand.DeleteProduct(product, _context);

            return NoContent();
        }
        #endregion

        #region Upload Image
        [HttpPost, Route("upload-image")]
        public IActionResult Upload()
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Images", "Product");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                string dbPath = CommonFunc.UploadImage(pathToSave, folderName, file);
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }
        #endregion
    }
}
