
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Interface
{
    public interface IUsersCommand
    {
        Task<OM_Users> GetUsersByToken(string accessToken);
        Task<ActionResult<OM_Users>> GetUsers(string email, string password);
        OM_Users AuthenticateUser(UserLogin login, string tokenString);
        Task<ActionResult<ApiResult<OM_Users>>> FindUser([FromBody] QueryParamsModel<OM_Users> query);
        Task<ActionResult<OM_Users>> GetUserById(int userID);
        Task<ActionResult<OM_Users>> PostUsers(OM_Users user);
        Task<ActionResult<OM_Users>> PutUsers(OM_Users user);
        Task<ActionResult<OM_Users>> DeleteUsers(OM_Users user);
        Task<ActionResult<IEnumerable<SI_Occupation>>> GetListOccupations();
    }
}
