using System.Net;
using Abc.BusinessService;

namespace WebApp.Server
{

public class TokenMiddleware {
    private readonly RequestDelegate _next;
    private readonly ITokenService service;

    public TokenMiddleware(RequestDelegate next, ITokenService tokenService) {
        _next = next;
        service = tokenService;
    }
    public async Task Invoke(HttpContext httpContext) {

        var cToken = httpContext.Request.Headers.Authorization.FirstOrDefault();

        if(!string.IsNullOrEmpty(cToken)){
            var bearer = cToken.Split(' ');
            
            if(bearer.Length==1) {
              await _next(httpContext);
              return;
            }
            
            var token = bearer[1];

            if(service!=null){
                var tokenData = await service.GetActualToken(token);
                if(tokenData!=null){
                    httpContext.Request.Headers.Authorization = "Bearer "+tokenData.ActualToken;
                }else{
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    httpContext.Response.ContentType = "text/plain";
                    await httpContext.Response.WriteAsync("unauthorized");  
                }
            }
        }

        await _next(httpContext);
    }
}

}
