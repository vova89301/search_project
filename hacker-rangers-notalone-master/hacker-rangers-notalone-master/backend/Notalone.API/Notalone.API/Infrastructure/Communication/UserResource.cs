using System.ComponentModel.DataAnnotations;
using Notalone.API.Models;

namespace Notalone.API.Infrastructure.Communication
{
    public class UserResource
    {
        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string Username { get; set; }        
        
        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string Password { get; set; }        
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string About { get; set; }
        
        [Required]
        [MaxLength(500)]
        public List<Tag> Technologies { get; set; }
    }
}