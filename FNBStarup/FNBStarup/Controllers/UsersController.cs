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
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Repository.Command.Interface;
using static Entities.Data.Common.Common;
using System.IO;
using LoggerService;
using FNBStartup.Helper;

namespace FNBStarup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IConfiguration _config;
        private readonly IUsersCommand _usersCommand;
        private ILoggerManager _logger;
        public UsersController(ApplicationDbContext context, IUsersCommand usersCommand, IConfiguration config, ILoggerManager logger)
        {
            _context = context;
            _usersCommand = usersCommand;
            _config = config;
            _logger = logger;
    }

        #region Get And Find Users
        [HttpPost, Route("login")]
        public IActionResult GetUsers([FromBody] UserLogin userLogin)
        {
            IActionResult response = Unauthorized();
            var tokenString = ContentHelper.GenerateJSONWebToken(userLogin, _config);
            var user = _usersCommand.AuthenticateUser(userLogin, tokenString);
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersByToken()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var user = await _usersCommand.GetUsersByToken(accessToken);
            return Ok(user);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<OM_Users>> GetUsersByUsersID(int userId) 
        {
            var user = await _usersCommand.GetUserById(userId);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost, Route("findUsers")]
        [Authorize]
        public async Task<ActionResult<ApiResult<IActionResult>>> FindRoles([FromBody] QueryParamsModel<OM_Users> query)
        {
            var user = await _usersCommand.FindUser(query);
            return Ok(user.Value);
        }

        [HttpGet, Route("occupation")]
        public async Task<IActionResult> GetOccupation()
        {
            var occupations = await _usersCommand.GetListOccupations();
            return Ok(occupations.Value);
        }
        #endregion

        #region Save Delete
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OM_Users>> PostRoles(OM_Users users)
        {
            await _usersCommand.PostUsers(users);
            return CreatedAtAction("FindRoles", new { id = users.Id }, users);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<OM_Users>> PutUsers(OM_Users users)
        {
            await _usersCommand.PutUsers(users);
            return CreatedAtAction("FindRoles", new { id = users.Id }, users);
        }

        [HttpDelete("{userId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCity(int userId)
        {
            var role = await _context.OM_Users.FindAsync(userId);
            if (role == null)
            {
                return NotFound();
            }

            await _usersCommand.DeleteUsers(role);

            return NoContent();
        }
        #endregion

        #region Upload Image
        [HttpPost, Route("upload-image")]
        public IActionResult Upload()
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Images", "Users");
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
