using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notalone.API.Context;
using Notalone.API.Infrastructure.Auth;
using Notalone.API.Infrastructure.Communication;
using Notalone.API.Models;
using Notalone.API.Models.Auth;

namespace Notalone.API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDatabaseContext _context;

        public UsersController(
            IUserService userService, 
            IDatabaseContext context)
        {
            _userService = userService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var user = await _userService.Authenticate(model.Username, model.Password);
            return Ok(user);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserResource resource, CancellationToken cancellationToken = default)
        {
            var user = new User()
            {             
                Id = Guid.NewGuid(),
                Password = resource.Password,
                Username = resource.Username,
                Technologies = resource.Technologies,
                About = "This is text about me",
                ProjectId = Guid.NewGuid()
                
            };

            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(user);
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ListUserResource resource, CancellationToken cancellationToken = default)
        {
            if (resource.Limit < -1)
                throw new ArgumentException("The offset parameter shout be positive number!");
            if (resource.Offset < -1)
                throw new ArgumentException("The offset parameter shout be positive number!");

            var query = _context.Users.AsQueryable();
            if (resource.OrderByDescending)
                query = query.OrderByDescending(item => item.Username);
            else
                query = query.OrderBy(item => item.Username);
            query = query.Skip(resource.Offset).Take(resource.Limit);

            var result =  await query.ToListAsync(cancellationToken);
            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            return Ok(user);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            
            if (user == null) return default;
            
            _context.Users.Remove(user);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(user);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserResource resource, CancellationToken cancellationToken = default)
        {
            var user = await _context.Users
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (user == null) return default;

            user.About = resource.About;
            user.Technologies = resource.Technologies;
            
            _context.Users.Update(user);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(user);
        }
    }
}