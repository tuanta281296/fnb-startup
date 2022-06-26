using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Interface
{
    public interface IRolesCommand
    {
        Task<ActionResult<IEnumerable<OM_UsersRole>>> GetRoleUsers();
        Task<ActionResult<ApiResult<OM_UsersRole>>> FindRoles([FromBody] QueryParamsModel<OM_UsersRole> query);
        Task<ActionResult<OM_UsersRole>> PostRoles(OM_UsersRole userRole);
        Task<ActionResult<OM_UsersRole>> PutRoles(OM_UsersRole role);
        Task<ActionResult<OM_UsersRole>> DeleteRoles(OM_UsersRole role);
        Task<ActionResult<IEnumerable<OM_Permissions>>> GetAllPermission();
    }
}
