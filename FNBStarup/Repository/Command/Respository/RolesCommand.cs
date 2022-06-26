using Repository.Command.Interface;
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Respository
{
    public class RolesCommand : IRolesCommand
    {
        private readonly ApplicationDbContext _context;
        public RolesCommand(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<OM_UsersRole>>> GetRoleUsers()
        {
            // first we perform the filtering...
            var userRoles = GetListUserRoles();
            // ... and then we call the ApiResult
            return await userRoles.ToListAsync();
        }
        public async Task<ActionResult<ApiResult<OM_UsersRole>>> FindRoles([FromBody] QueryParamsModel<OM_UsersRole> query)
        {
            // first we perform the filtering...
            var userRoles = GetListUserRoles().AsQueryable();
            if (!string.IsNullOrEmpty(query.Filter.Title))
            {
                userRoles = userRoles.Where(c => c.Title.Contains(query.Filter.Title));
            }
            // ... and then we call the ApiResult
            return await ApiResult<OM_UsersRole>.CreateAsync(
                    userRoles,
                    query);
        }
        public async Task<ActionResult<OM_UsersRole>> PostRoles(OM_UsersRole userRole)
        {
            _context.OM_UsersRole.Add(userRole);
            await _context.SaveChangesAsync();

            foreach (var rolePermission in userRole.Permissions)
            {
                OM_PermissionsRole permissionRole = new OM_PermissionsRole();
                permissionRole.RoleID = userRole.Id;
                permissionRole.PermissionsID = rolePermission;
                _context.OM_PermissionsRole.Add(permissionRole);
            }

            await _context.SaveChangesAsync();

            return userRole;
        }
        public async Task<ActionResult<OM_UsersRole>> PutRoles(OM_UsersRole role)
        {
            _context.Entry(role).State = EntityState.Modified;

            foreach (var roleId in _context.OM_PermissionsRole.Where(p => p.RoleID == role.Id))
            {
                _context.OM_PermissionsRole.Remove(roleId);
            }
            await _context.SaveChangesAsync();

            foreach (var roleId in role.Permissions)
            {
                OM_PermissionsRole permissionRole = new OM_PermissionsRole();
                permissionRole.RoleID = role.Id;
                permissionRole.PermissionsID = roleId;
                _context.OM_PermissionsRole.Add(permissionRole);
            }
            await _context.SaveChangesAsync();
            return role;
        }
        public async Task<ActionResult<OM_UsersRole>> DeleteRoles(OM_UsersRole role)
        {
            _context.OM_UsersRole.Remove(role);

            foreach (var item in _context.OM_PermissionsRole.Where(p => p.RoleID == role.Id))
            {
                _context.OM_PermissionsRole.Remove(item);
            }

            await _context.SaveChangesAsync();

            return role;
        }
        public async Task<ActionResult<IEnumerable<OM_Permissions>>> GetAllPermission()
        {
            // first we perform the filtering...
            var permissionRoles = _context.OM_Permissions;
            // ... and then we call the ApiResult
            return await permissionRoles.ToListAsync();
        }

        #region Common Function 
        public DbSet<OM_UsersRole> GetListUserRoles()
        {
            var userRoles = _context.OM_UsersRole;
            var permissionRoles = _context.OM_PermissionsRole.ToList();

            foreach (var v in userRoles)
            {
                foreach (var v1 in permissionRoles.Where(p => p.RoleID == v.Id))
                {
                    v.Permissions.Add(v1.PermissionsID);
                }
            }

            return userRoles;
        }
        #endregion
    }
}
