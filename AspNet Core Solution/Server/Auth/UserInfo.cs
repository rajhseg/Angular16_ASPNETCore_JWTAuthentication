using System.ComponentModel.DataAnnotations;

namespace WebAssemblyApp.Server.Auth
{
    [Serializable]
    public class UserInfo
    {
        [Required(ErrorMessage ="UserName is mandatory")]
        public string UserName { get; set; }

        [Required(ErrorMessage ="Password is mandatory")]
        public string Password { get; set; }

        public string Role { get; set; }
    }
}
