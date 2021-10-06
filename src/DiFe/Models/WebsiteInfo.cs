using System;

namespace DiFe.Models
{
    public class WebsiteInfo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString("N");
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Wallet { get; set; } = string.Empty;
    }
}