using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notalone.API.Models;

public class Tag
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key()]
    public int Id { get; set; }
    public Technology Technology { get; set; }
}

public enum Technology
{
    Js, Css, HTML, React, Angular, Java, Dotnet, Docker, Design
}