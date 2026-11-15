using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Server.Auth
{
    public class CustomAntiForgeryFilter : IAsyncAuthorizationFilter
    {
        private readonly IAntiforgery _antiforgery;

        public CustomAntiForgeryFilter(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var httpContext = context.HttpContext;
            var method = httpContext.Request.Method;

            if (HttpMethods.IsGet(method) ||
                HttpMethods.IsHead(method) ||
                HttpMethods.IsOptions(method) ||
                HttpMethods.IsTrace(method))
            {
                return;
            }

            try
            {
                await _antiforgery.ValidateRequestAsync(httpContext);
            }
            catch (AntiforgeryValidationException)
            {
                context.Result = new Microsoft.AspNetCore.Mvc.BadRequestObjectResult(new
                {
                    Error = "Invalid Request"
                });
            }
        }
    }
}
