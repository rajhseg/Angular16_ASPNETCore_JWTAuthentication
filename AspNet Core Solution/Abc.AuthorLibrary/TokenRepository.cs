
using ABC.BusinessBase;
using ABC.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abc.AuthorLibrary
{
    public class TokenRepository : Repository<Token>, ITokenRepository
    {
        public TokenRepository(DbContext context) : base(context)
        {
            
        }
    }
}
