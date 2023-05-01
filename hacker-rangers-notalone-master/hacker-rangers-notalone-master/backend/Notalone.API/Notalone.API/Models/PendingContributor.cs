using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notalone.API.Models;

public class PendingContributor
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key()]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}