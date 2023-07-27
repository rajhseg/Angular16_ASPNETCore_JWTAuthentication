using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Shared.ViewModel;
using WebAssemblyApp.Server.Auth;
using WebAssemblyApp.Shared.ViewModel;

namespace WebAssemblyApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly IUserInfoService userInfoService;
        private readonly IJwtAuthentication jwtAuthentication;

        public LoginController(IUserInfoService userInfoService, IJwtAuthentication jwtAuthentication)
        {
            this.jwtAuthentication = jwtAuthentication;
            this.userInfoService = userInfoService;
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn(LoginModel request)
        {
            if(request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest();
            }

            var loginUser = this.userInfoService.GetUserInfo(request.UserName);

            if (loginUser==null || loginUser.Password != request.Password)
                return Unauthorized();

            var token = this.jwtAuthentication.GenerateJwtToken(loginUser.UserName, loginUser.Role);
            var result = new UserInfoObject { Token = token, UserName = loginUser.UserName, Role = loginUser.Role, Expires = 20 };
            return Ok(result);
        }

        [HttpPost]
        [Route("validate")]
        public IActionResult Validate([FromBody]ValidateTokenModel model)
        {
            var id = this.jwtAuthentication.ValidateToken(model.Token);
            return Ok(new ValidateTokenResponse { Sid = id });
        }
    }
}
