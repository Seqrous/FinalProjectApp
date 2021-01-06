using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        /*
            Updates the user
        */
        void Update(AppUser user);
        /*
            Saves all the changes asynchronously
        */
        Task<bool> SaveAllAsync();
        /* 
            Returns a user with the given ID asynchronously
        */
        Task<AppUser> GetUserByIdAsync(string id);
        /* 
            Returns all users asynchronously
        */
        Task<IEnumerable<AppUser>> GetUsersAsync();

        /*
            Get orders specific to a user
        */
        Task<IEnumerable<Order>> GetUserOrders(string id);
    }
}