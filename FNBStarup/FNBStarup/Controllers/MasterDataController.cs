using Entities.Data;
using LoggerService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Repository.Command.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FNBStartup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterDataController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IMasterDataCommand _masterDataCommand;
        private ILoggerManager _logger;
        public MasterDataController(ApplicationDbContext context, IMasterDataCommand masterDataCommand, IConfiguration config, ILoggerManager logger)
        {
            _masterDataCommand = masterDataCommand;
            _config = config;
            _logger = logger;
        }

        [HttpGet, Route("cities")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _masterDataCommand.GetListCities();
            return Ok(cities.Value);
        }

        [HttpGet, Route("districts")]
        public async Task<IActionResult> GetDistrict()
        {
            var districts = await _masterDataCommand.GetListDistricts();
            return Ok(districts.Value);
        }

        [HttpGet, Route("producttype")]
        public async Task<IActionResult> GetProductType()
        {
            var producttype = await _masterDataCommand.GetListProductType();
            return Ok(producttype.Value);
        }

        [HttpGet, Route("unit")]
        public async Task<IActionResult> GetPurchaseUnit()
        {
            var unit = await _masterDataCommand.GetPurchaseUnit();
            return Ok(unit.Value);
        }
    }
}
