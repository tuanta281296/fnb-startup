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
using Repository.Command;
using static Entities.Data.Common.Common;
using System.IO;
using LoggerService;

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
            var tokenString = GenerateJSONWebToken(userLogin);
            var user = _usersCommand.AuthenticateUser(userLogin, _context, tokenString);
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersByToken()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var user = await _usersCommand.GetUsersByToken(_context, accessToken);
            return Ok(user);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<OM_Users>> GetUsersByUsersID(int userId) 
        {
            var user = await _usersCommand.GetUserById(_context, userId);

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
            var user = await _usersCommand.FindUser(query, _context);
            return Ok(user.Value);
        }

        [HttpGet, Route("occupation")]
        public async Task<IActionResult> GetOccupation()
        {
            var occupations = await _usersCommand.GetListOccupations(_context);
            return Ok(occupations.Value);
        }
        #endregion

        #region Save Delete
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OM_Users>> PostRoles(OM_Users users)
        {
            await _usersCommand.PostUsers(users, _context);
            return CreatedAtAction("FindRoles", new { id = users.Id }, users);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<OM_Users>> PutUsers(OM_Users users)
        {
            await _usersCommand.PutUsers(users, _context);
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

            await _usersCommand.DeleteUsers(role, _context);

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

        public string GenerateJSONWebToken([FromBody] UserLogin userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:securityKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                 new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["JWTSettings:validIssuer"], _config["JWTSettings:validIssuer"],
                        claims,
                        expires: DateTime.Now.AddMinutes(120),
                        signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
