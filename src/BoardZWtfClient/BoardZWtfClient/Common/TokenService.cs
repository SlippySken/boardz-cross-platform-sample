using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace BoardZWtfClient.Common
{
    public class TokenService
    {
        private static string _cachedToken;

        public async Task<string> RequestAccessToken(string username, string password)
        {
            var tokenClient = new TokenClient(Configuration.TokenUrl);
            var response = await tokenClient.RequestResourceOwnerPasswordAsync(username, password);

            if (response.IsError || response.IsHttpError)
            {
                throw new Exception(String.Format("Error while getting a token {0}, {1}", response.Error, response.HttpErrorReason));
            }

            _cachedToken = response.AccessToken;

            return _cachedToken;
        }

        public string GetAccessToken()
        {
            return _cachedToken;
        }
    }
}
