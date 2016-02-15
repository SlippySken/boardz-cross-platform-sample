using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BoardZWtfClient.Common
{
    public class ApiService
    {
        public async Task<IEnumerable<BoardGame.Api.Models.BoardGame>> GetList()
        {
            var tokenService = new TokenService();

            var token = tokenService.GetAccessToken();

            if (String.IsNullOrEmpty(token))
            {
                throw new Exception("No access token. :-(");
            }

            var httpClient = new HttpClient();
            httpClient.SetBearerToken(token);
            var webResult = await httpClient.GetStringAsync(Configuration.ApiUrl + "boardgames/list");
            var result = JsonConvert.DeserializeObject<IEnumerable<BoardGame.Api.Models.BoardGame>>(webResult);
            return result;
        } 
    }
}