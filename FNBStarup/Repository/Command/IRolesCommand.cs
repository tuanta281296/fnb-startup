using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command
{
    public interface IRolesCommand
    {
        Task<ActionResult<IEnumerable<OM_UsersRole>>> GetRoleUsers(ApplicationDbContext _context);
        Task<ActionResult<ApiResult<OM_UsersRole>>> FindRoles([FromBody] QueryParamsModel<OM_UsersRole> query, ApplicationDbContext _context);
        Task<ActionResult<OM_UsersRole>> PostRoles(OM_UsersRole userRole, ApplicationDbContext _context);
        Task<ActionResult<OM_UsersRole>> PutRoles(OM_UsersRole role, ApplicationDbContext _context);
        Task<ActionResult<OM_UsersRole>> DeleteRoles(OM_UsersRole role, ApplicationDbContext _context);
        Task<ActionResult<IEnumerable<OM_Permissions>>> GetAllPermission(ApplicationDbContext _context);
    }
}
