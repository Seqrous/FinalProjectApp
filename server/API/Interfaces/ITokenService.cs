using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        /*
            Creates a token for user authorization
        */
        string CreateToken(AppUser user);
    }
}