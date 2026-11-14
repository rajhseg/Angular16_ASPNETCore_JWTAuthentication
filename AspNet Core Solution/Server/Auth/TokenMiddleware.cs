using Abc.BusinessService;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace WebApp.Server
{

public class TokenMiddleware {
    private readonly RequestDelegate _next;

    public TokenMiddleware(RequestDelegate next) {
        _next = next;
    }
    public async Task Invoke(HttpContext httpContext, ITokenService service) {

        /* This approach is for read the token from cookies, when using cookie, then we have to send the AntiforgeryToken for all calls */
        var cookie_token = httpContext.Request.Cookies["access_token"];

        if (!string.IsNullOrEmpty(cookie_token))
        {
            var tokenData = await service.GetActualToken(cookie_token);

            if (tokenData != null)
            {
                httpContext.Request.Headers.Authorization = "Bearer " + tokenData.ActualToken;
            }
            else
            {
                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                httpContext.Response.ContentType = "text/plain";
                await httpContext.Response.WriteAsync("unauthorized");
            }   
        }

        /* if read the token from headers uncomment the below code*/
       
        /*
        var cToken = httpContext.Request.Headers.Authorization.FirstOrDefault();

        if(!string.IsNullOrEmpty(cToken)) {
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
        
         */

        await _next(httpContext);
    }
}

}
