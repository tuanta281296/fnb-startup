using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Authorization;
using static Entities.Data.Common.Common;
using Repository.Command;
using LoggerService;

namespace FNBStarup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRolesCommand _rolesCommand;
        private ILoggerManager _logger;
        public RolesController(ApplicationDbContext context, IRolesCommand rolesCommand, ILoggerManager logger)
        {
            _context = context;
            _rolesCommand = rolesCommand;
            _logger = logger;
        }

        #region Roles Users
        [HttpGet]
        public async Task<IActionResult> GetRoleUsers()
        {
            var roleUsers = await _rolesCommand.GetRoleUsers(_context);
            return Ok(roleUsers.Value);
        }

        [HttpPost, Route("findRoles")]
        public async Task<ActionResult<ApiResult<IActionResult>>> FindRoles([FromBody] QueryParamsModel<OM_UsersRole> query)
        {
            var roleUsers = await _rolesCommand.FindRoles(query, _context);
            return Ok(roleUsers.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IActionResult>> GetRoleById(int id)
        {
            var roles = await _context.OM_UsersRole.FindAsync(id);

            if (roles == null)
            {
                return NotFound();
            }

            return Ok(roles);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OM_UsersRole>> PostRoles(OM_UsersRole userRole)
        {
            await _rolesCommand.PostRoles(userRole, _context);

            return CreatedAtAction("GetRoleById", new { id = userRole.Id }, userRole);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> PutRoles(OM_UsersRole role)
        {
            try
            {
                await _rolesCommand.PutRoles(role, _context);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolesExists(role.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{roleId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCity(int roleId)
        {
            var role = await _context.OM_UsersRole.FindAsync(roleId);
            if (role == null)
            {
                return NotFound();
            }

            await _rolesCommand.DeleteRoles(role, _context);

            return NoContent();
        }
        #endregion

        #region Permissions
        [HttpGet, Route("permissions")]
        public async Task<ActionResult<IEnumerable<OM_Permissions>>> GetAllPermission()
        {
            var permission = await _rolesCommand.GetAllPermission(_context);
            return Ok(permission.Value);
        }
        #endregion

        #region Common Function 
        private bool RolesExists(int id)
        {
            return _context.OM_UsersRole.Any(e => e.Id == id);
        }
        #endregion
    }
}
