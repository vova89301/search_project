using System.Data;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Notalone.API.Models;
using Notalone.API.Models.Auth;

namespace Notalone.API.Context
{
    public class DatabaseSqlServerContext : DbContext, IDatabaseContext
    {
    private IDbContextTransaction _currentTransaction;

    public DatabaseSqlServerContext(DbContextOptions<DatabaseSqlServerContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
        
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().ToTable("Users");
        modelBuilder.Entity<Project>().ToTable("Projects");
    }

    public new Task SaveChangesAsync(CancellationToken cancellationToken) =>
        base.SaveChangesAsync(cancellationToken);
    
    public Task SaveChangesAsync() =>
        base.SaveChangesAsync();

    public new DbSet<T> Set<T>([NotNull] string name) where T : class =>
        base.Set<T>(name);       
    
    public new DbSet<T> Set<T>() where T : class =>
        base.Set<T>();
    
    public async Task BeginTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            return;
        }

        _currentTransaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
    }

    public async Task CommitTransactionAsync()
    {
        try
        {
            await SaveChangesAsync();

            await (_currentTransaction?.CommitAsync() ?? Task.CompletedTask);
        }
        catch
        {
            RollbackTransaction();
            throw;
        }
        finally
        {
            if (_currentTransaction != null)
            {
                _currentTransaction.Dispose();
                _currentTransaction = null;
            }
        }
    }

    public void RollbackTransaction()
    {
        try
        {
            _currentTransaction?.Rollback();
        }
        finally
        {
            if (_currentTransaction != null)
            {
                _currentTransaction.Dispose();
                _currentTransaction = null;
            }
        }
    }
    }
}