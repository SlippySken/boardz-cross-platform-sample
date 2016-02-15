using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoardZWtfClient.Common
{
    public static class Configuration
    {
        public static string BaseUrl = "https://boardzapi.azurewebsites.net/";
        public static string TokenUrl = BaseUrl + "token";
        public static string ApiUrl = BaseUrl + "api/";
    }
}
