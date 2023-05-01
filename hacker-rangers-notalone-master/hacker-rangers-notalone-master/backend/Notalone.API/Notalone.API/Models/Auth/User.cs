using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notalone.API.Models.Auth
{
    public class User : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key()]
        public Guid Id { get; set; }
        
        public Guid? ProjectId { get; set; }
        public string About { get; set; }
        public List<Tag> Technologies { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}