using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAssemblyApp.Shared.ViewModel
{
    public class UserInfoObject
    {
        public int Expires { get; set; }

        public DateTime ExpiresTime { get; set; }

        public string UserName { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }
    }
}
