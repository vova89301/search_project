using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Notalone.API.Models;
using Notalone.API.Models.Auth;

namespace Notalone.API.Context
{
    public interface IDatabaseContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Project> Projects { get; set; }
        Task SaveChangesAsync(CancellationToken cancellationToken);
        Task SaveChangesAsync();
        DbSet<T> Set<T>([NotNull] string name) where T : class;
        DbSet<T> Set<T>() where T : class;
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        void RollbackTransaction();
    }
}