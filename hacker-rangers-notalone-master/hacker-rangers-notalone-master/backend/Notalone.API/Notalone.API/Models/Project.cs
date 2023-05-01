using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Notalone.API.Models.Auth;

namespace Notalone.API.Models;

public class Project : IEntity
{
    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity), Key()]
    public Guid Id { get; set; }
    
    [Required]
    public Guid CreatorId { get; set; }    
    
    [Required]
    public string CreatorName { get; set; }
    
    [Required]
    [MinLength(1)]
    [MaxLength(100)]
    public string Caption { get; set; }

    [Required]
    [MaxLength(10000)]
    public string Description { get; set; }

    public DateTime CreationDate { get; set; }
    public List<Contributor> Contributors { get; set; }
    public List<PendingContributor> PendingContributors { get; set; }
    public List<Tag> Tags { get; set; }
}