using Notalone.API.Models.Auth;

namespace Notalone.API.Infrastructure.Auth
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
    }
}