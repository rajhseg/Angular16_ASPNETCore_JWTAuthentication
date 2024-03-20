using Abc.BusinessService;
using Abc.UnitOfWorkLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Server;
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
        private readonly string password = "AAAAFFFFSDGTWSTY1234";

        private readonly IUserInfoService userInfoService;
        private readonly IJwtAuthentication jwtAuthentication;
        private readonly ITokenService tokenService;

        private readonly IUnitOfWork unitOfWork;

        public LoginController(IUserInfoService userInfoService, IJwtAuthentication jwtAuthentication,
            ITokenService tokenService,
            IUnitOfWork unitOfWork)
        {
            this.jwtAuthentication = jwtAuthentication;
            this.userInfoService = userInfoService;
            this.tokenService = tokenService;
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("signout")]
        public async Task<IActionResult> SignOut(LoginModel request)
        {
            if(request.Password!=null){

                  using(var trans = await this.unitOfWork.BeginTransactionAsync()){

                    try{
                        var tokenData = await this.tokenService.GetActualToken(request.Password);
                        await this.tokenService.DeleteToken(tokenData.Id);
                        await this.unitOfWork.CommitTransactionAsync(trans);
                        return Ok();
                    }
                    catch{
                        await this.unitOfWork.RollbackTransactionAsync(trans);
                        return BadRequest();
                    }
                    finally{
                        await trans.DisposeAsync();
                    }
                  }
            }

            return BadRequest();
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
            var encodedToken = EncDecHelper.EncryptedData(Guid.NewGuid().ToString(), password);
            var refreshToken = EncDecHelper.EncryptedData(Guid.NewGuid().ToString(), password);
            
                using(var trans = await this.unitOfWork.BeginTransactionAsync()){
                try{        
                    var tokenData = new ABC.Models.Token();
                    tokenData.ActualToken = token;
                    tokenData.ClientToken = encodedToken;
                    tokenData.RefreshToken = refreshToken;
                    await this.tokenService.AddToken(tokenData);
                    await this.unitOfWork.CommitTransactionAsync(trans);

                    var result = new UserInfoObject { Token = encodedToken, UserName = loginUser.UserName, 
                                        Role = loginUser.Role, Expires = 20, RefreshToken = refreshToken };
                    return Ok(result);
                }
                catch{
                    await this.unitOfWork.RollbackTransactionAsync(trans);
                    return Unauthorized();
                }
                finally{
                    await trans.DisposeAsync();                    
                }
            }  
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
