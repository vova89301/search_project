using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notalone.API.Context;
using Notalone.API.Infrastructure.Communication;
using Notalone.API.Models;

namespace Notalone.API.Controllers
{    
    [ApiController]
    [Route("projects")]
    public class ProjectsController : Controller
    {
        private readonly IDatabaseContext _context;
        public ProjectsController(IDatabaseContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectResource resource, CancellationToken cancellationToken = default)
        {
            var project = new Project()
            {             
                Id = Guid.NewGuid(),
                Caption = resource.Caption,
                Description = resource.Description,
                CreationDate = DateTime.Now,
                Contributors = new List<Contributor>()
                {
                    new Contributor(){Name = "Vasya"}
                },
                PendingContributors = new List<PendingContributor>()
                {
                    new (){Name = "Petya"}
                },
                Tags = new List<Tag>()
                {
                    new Tag(){Technology = Technology.Angular}
                },
                CreatorId = Guid.NewGuid(),
                CreatorName = "Vasya"
            };

            await _context.Projects.AddAsync(project, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(project);
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ListProjectResource resource, CancellationToken cancellationToken = default)
        {
            if (resource.Limit < -1)
                throw new ArgumentException("The offset parameter shout be positive number!");
            if (resource.Offset < -1)
                throw new ArgumentException("The offset parameter shout be positive number!");

            var query = _context.Projects.AsQueryable();
            if (resource.OrderByDescending)
                query = query.OrderByDescending(item => item.CreationDate);
            else
                query = query.OrderBy(item => item.CreationDate);
            query = query.Skip(resource.Offset).Take(resource.Limit);

            var result =  await query.ToListAsync(cancellationToken);
            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var project = await _context.Projects
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            return Ok(project);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var project = await _context.Projects
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            
            if (project == null) return default;
            
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(project);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ProjectResource resource, CancellationToken cancellationToken = default)
        {
            var project = await _context.Projects
                .Where(item => item.Id == id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (project == null) return default;

            project.Description = resource.Description;
            project.Caption = resource.Caption;
            
            _context.Projects.Update(project);
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(project);
        }
    }
}