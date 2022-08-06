using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repository.Command.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace FNBStartup.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchController : ControllerBase
    {
        private readonly IBranchCommand _branchCommand;

        public BranchController(ApplicationDbContext context, IBranchCommand branchCommand)
        {
            _branchCommand = branchCommand;
        }

        [HttpGet]
        public async Task<IActionResult> GetBranches()
        {
            var brances = await _branchCommand.GetBranches();
            return Ok(brances.Value);
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> PutBranches(Branches branches)
        {
            await _branchCommand.PutBranches(branches);

            return NoContent();
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostBranches(Branches branches)
        {
            await _branchCommand.PostBranches(branches);

            return NoContent();
        }

        [HttpDelete("{idBranch}")]
        [Authorize]
        public async Task<IActionResult> DeleteBranch(int idBranch)
        {
            await _branchCommand.DeleteBranches(idBranch);

            return NoContent();
        }

        [HttpPost, Route("findBranches")]
        public async Task<ActionResult<ApiResult<IActionResult>>> FindRoles([FromBody] QueryParamsModel<Branches> query)
        {
            var branches = await _branchCommand.FindBranches(query);

            return Ok(branches.Value);
        }
    }
}
