namespace WebAssemblyApp.Server.Auth
{
    public interface IUserInfoService
    {
        UserInfo? GetUserInfo(string username);
    }
}
