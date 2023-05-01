using System.ComponentModel.DataAnnotations;

namespace Notalone.API.Infrastructure.Communication
{
    public class ProjectResource
    {
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Caption { get; set; }
        
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
    }
}