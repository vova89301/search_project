using Notalone.API.Infrastructure.Extensions;
using Notalone.API.Models.Auth;

namespace Notalone.API.Infrastructure.Auth
{
    public class UserService : IUserService
    {        
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private readonly List<User> _users = new List<User>();
        public UserService()
        {
            var username = Environment.GetEnvironmentVariable("USER_SERVICE_USERNAME") ?? "test";
            var password = Environment.GetEnvironmentVariable("USER_SERVICE_PASSWORD") ?? "test";
            _users.Add(new User { Id = Guid.NewGuid(), Username = username, Password = password });
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await Task
                .Run(() => _users.SingleOrDefault(x => x.Username == username && x.Password == password));

            return user?.WithoutPassword();
        }
    }
}