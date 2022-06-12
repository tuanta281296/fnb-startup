
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command
{
    public interface IUsersCommand
    {
        Task<OM_Users> GetUsersByToken(ApplicationDbContext _context, string accessToken);
        Task<ActionResult<OM_Users>> GetUsers(ApplicationDbContext _context, string email, string password);
        OM_Users AuthenticateUser(UserLogin login, ApplicationDbContext _context, string tokenString);
        Task<ActionResult<ApiResult<OM_Users>>> FindUser([FromBody] QueryParamsModel<OM_Users> query, ApplicationDbContext _context);
        Task<ActionResult<OM_Users>> GetUserById(ApplicationDbContext _context, int userID);
        Task<ActionResult<OM_Users>> PostUsers(OM_Users user, ApplicationDbContext _context);
        Task<ActionResult<OM_Users>> PutUsers(OM_Users user, ApplicationDbContext _context);
        Task<ActionResult<OM_Users>> DeleteUsers(OM_Users user, ApplicationDbContext _context);
        Task<ActionResult<IEnumerable<SI_Occupation>>> GetListOccupations(ApplicationDbContext _context);
    }
}
