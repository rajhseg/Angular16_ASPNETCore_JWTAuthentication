using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAssemblyApp.Shared.Services
{
    public static class SerializableExtensions
    {
        public static string ConvertToString(this object obj)
        {
            string json = JsonConvert.SerializeObject(obj);

            byte[] bytes = Encoding.UTF8.GetBytes(json);

            return Convert.ToBase64String(bytes);
        }

        public static T? ConvertToObject<T>(this string base64Text)
        {
            byte[] bytes = Convert.FromBase64String(base64Text);

            string json = Encoding.UTF8.GetString(bytes);

            return JsonConvert.DeserializeObject<T>(json);
        }

        public static string ConvertToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
