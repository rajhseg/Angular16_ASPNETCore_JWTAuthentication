using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abc.BusinessService
{
    public static class BusinessRegistration
    {
        public static void RegisterApplicationLayer(this IServiceCollection service) 
        {
            service.AddScoped<ITokenService, TokenService>();
            service.AddScoped<IAuthorService, AuthorService>();
            service.AddScoped<IBookService, BookService>();
        }
    }
}
