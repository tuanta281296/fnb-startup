using Repository.Command;
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Entities.Data.Common;
using static Entities.Data.Common.Common;
using System.Collections.Generic;

namespace Repository.Command
{
    public class UsersCommand : IUsersCommand
    {
        public async Task<OM_Users> GetUsersByToken(ApplicationDbContext _context, string accessToken)
        {
            HostSetting hostSetting = new HostSetting();
            // first we perform the filtering...
            var user = await _context.OM_Users.Where(p => p.AccessToken.ToLower() == accessToken).FirstOrDefaultAsync();
            var addressesUsers = _context.AR_Address.ToList();
            var usersRole = _context.OM_UsersAddRole.ToList();
            if (user != null) 
            {
                foreach (var v1 in addressesUsers.Where(p => p.UserID == user.Id))
                {
                    AR_Address userAddress = new AR_Address();
                    userAddress.District = v1.District;
                    userAddress.City = v1.City;
                    userAddress.AddressLine = v1.AddressLine;
                    user.Address = userAddress;
                }

                foreach (var v2 in usersRole.Where(p => p.UserID == user.Id))
                {
                    user.Roles.Add(v2.RoleID);
                }
                // ... and then we call the ApiResult
                user.Password = null;
            }
            return user;
        }
        public async Task<ActionResult<OM_Users>> GetUsers(ApplicationDbContext _context, string email, string password)
        {
            // first we perform the filtering...
            var users = _context.OM_Users.Where(p => p.Email.ToLower() == email.ToLower() && p.Password.ToLower() == password.ToLower());
            //users.FirstOrDefault().Password = null;
            return await users.FirstAsync();
        }
        public OM_Users AuthenticateUser(UserLogin login, ApplicationDbContext _context, string tokenString)
        {
            // first we perform the filtering...
            var users = _context.OM_Users.Where(p => p.Email.ToLower() == login.Email.ToLower() && p.Password.ToLower() == login.Password.ToLower()).FirstOrDefault();
            if (users != null)
            {
                users.AccessToken = tokenString;
                users.RefreshToken = tokenString;
                _context.SaveChanges();
                users.Password = null;
            }
            return users;
        }
        public async Task<ActionResult<ApiResult<OM_Users>>> FindUser([FromBody] QueryParamsModel<OM_Users> query, ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var userRoles = GetListUser(_context).AsQueryable();
            if (!string.IsNullOrEmpty(query.Filter.Username))
            {
                userRoles = userRoles.Where(c => c.Username.Contains(query.Filter.Username));
            }
            // ... and then we call the ApiResult
            return await ApiResult<OM_Users>.CreateAsync(
                    userRoles,
                    query);
        }
        public async Task<ActionResult<OM_Users>> PostUsers(OM_Users user, ApplicationDbContext _context)
        {
            HostSetting hostSetting = new HostSetting();
            user.Password = "password";
            user.AccessToken = "access-token-8f3ae836da744329a6f93bf20594b5cc";
            user.RefreshToken = "access-token-f8c137a2c98743f48b643e71161d90aa";
            _context.OM_Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<ActionResult<OM_Users>> PutUsers(OM_Users user, ApplicationDbContext _context)
        {
            HostSetting hostSetting = new HostSetting();
            var userUpdate = await _context.OM_Users.FindAsync(user.Id);
            if (userUpdate != null)
            {
                userUpdate.Fullname = user.Fullname;
                userUpdate.Email = user.Email;
                userUpdate.Occupation = user.Occupation;
                userUpdate.BranchID = user.BranchID;
                userUpdate.Phone = user.Phone;
                userUpdate.Pic = user.Pic;

                if (user.Password != null)
                {
                    userUpdate.Password = user.Password;
                }

                var userAddress = _context.AR_Address.Where(p => p.UserID == user.Id).FirstOrDefault();

                if (userAddress == null)
                {
                    userAddress = new AR_Address();
                    userAddress.UserID = user.Id;
                    _context.AR_Address.Add(userAddress);
                }
                userAddress.AddressLine = user.Address.AddressLine;
                userAddress.City = user.Address.City;
                userAddress.Ward = user.Address.Ward;
                userAddress.District = user.Address.District;

                SaveRoleUser(user, _context);
            }
            await _context.SaveChangesAsync();

            return user;
        }
        public async Task<ActionResult<OM_Users>> DeleteUsers(OM_Users user, ApplicationDbContext _context)
        {
            _context.OM_Users.Remove(user);

            foreach (var item in _context.OM_UsersAddRole.Where(p => p.UserID == user.Id))
            {
                _context.OM_UsersAddRole.Remove(item);
            }

            foreach (var item in _context.AR_Address.Where(p => p.UserID == user.Id))
            {
                _context.AR_Address.Remove(item);
            }

            await _context.SaveChangesAsync();

            return user;
        }
        public async Task<ActionResult<IEnumerable<SI_Occupation>>> GetListOccupations(ApplicationDbContext _context)
        {
            // first we perform the filtering...
            var occupations = _context.SI_Occupation;
            // ... and then we call the ApiResult
            return await occupations.ToListAsync();
        }
        #region Common Function 
        public DbSet<OM_Users> GetListUser(ApplicationDbContext _context)
        {
            HostSetting hostSetting = new HostSetting();
            var user = _context.OM_Users;
            var addressesUsers = _context.AR_Address.ToList();
            var usersRole = _context.OM_UsersAddRole.ToList();
            foreach (var index in user)
            {
                foreach (var v1 in addressesUsers.Where(p => p.UserID == index.Id))
                {
                    AR_Address userAddress = new AR_Address();
                    userAddress.District = v1.District;
                    userAddress.City = v1.City;
                    userAddress.Ward = v1.Ward;
                    userAddress.AddressLine = v1.AddressLine;
                    index.Address = userAddress;
                }

                foreach (var v2 in usersRole.Where(p => p.UserID == index.Id))
                {
                    index.Roles.Add(v2.RoleID);
                }
                // ... and then we call the ApiResult
                index.Password = null;
            }
            return user;
        }
        public async Task<ActionResult<OM_Users>> GetUserById(ApplicationDbContext _context, int userID)
        {
            HostSetting hostSetting = new HostSetting();
            var user = await _context.OM_Users.FindAsync(userID);
            if (user != null)
            {
                var addressesUsers = _context.AR_Address.ToList();
                var usersRole = _context.OM_UsersAddRole.ToList();
                foreach (var v1 in addressesUsers.Where(p => p.UserID == user.Id))
                {
                    AR_Address userAddress = new AR_Address();
                    userAddress.District = v1.District;
                    userAddress.Ward = v1.Ward;
                    userAddress.City = v1.City;
                    userAddress.AddressLine = v1.AddressLine;
                    user.Address = userAddress;
                }

                foreach (var v2 in usersRole.Where(p => p.UserID == user.Id))
                {
                    user.Roles.Add(v2.RoleID);
                }
                // ... and then we call the ApiResult
                user.Password = null;
            }

            return user;
        }

        public void SaveRoleUser(OM_Users user, ApplicationDbContext _context)
        {
            var userRoleNotAssign = _context.OM_UsersRole.ToList();

            foreach (var v2 in user.Roles)
            {
                userRoleNotAssign.RemoveAll(p => p.Id == v2);
            }

            foreach (var v2 in userRoleNotAssign)
            {
                var userRole = _context.OM_UsersAddRole.Where(p => p.UserID == user.Id && p.RoleID == v2.Id).FirstOrDefault();
                if (userRole != null) 
                {
                    _context.OM_UsersAddRole.Remove(userRole);
                }
            }

            foreach (var v2 in user.Roles)
            {
                var userRole = _context.OM_UsersAddRole.Where(p => p.UserID == user.Id && p.RoleID == v2).FirstOrDefault();
                if (userRole == null)
                {
                    userRole = new OM_UsersAddRole();
                    _context.OM_UsersAddRole.Add(userRole);
                }
                userRole.UserID = user.Id;
                userRole.RoleID = v2;
            }
        }
        #endregion
    }
}
