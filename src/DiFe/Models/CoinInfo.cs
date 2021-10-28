using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiFe.Models
{
    public class CoinInfo
    {
        public string Address { get; set; } = string.Empty;
        public string Countdown { get; set; } = string.Empty;
        public string Id { get; set; } = Guid.NewGuid().ToString("N");
        public bool IsFarming { get; set; }
        public decimal LastPrice { get; set; }
        public decimal LastValue { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Wallet { get; set; } = string.Empty;
        public string Website { get; set; } = string.Empty;

        [NotMapped]
        public string ArkenChart => $"https://swap.arken.finance/tokens/bsc/{Address}";
        [NotMapped]
        public string BscScan => $"https://bscscan.com/address/{Address}";
        [NotMapped]
        public string DexGuruChart => $"https://dex.guru/token/{Address}";
        [NotMapped]
        // public string ImageUrl => $"https://assets.trustwalletapp.com/blockchains/smartchain/assets/{Address}/logo.png";
        public string ImageUrl => $"https://pancakeswap.finance/images/tokens/{Address}.svg";
        [NotMapped]
        public string PancakeSwap => $"https://pancakeswap.finance/swap?outputCurrency={Address}";
        [NotMapped]
        public string PooCoinChart => $"https://poocoin.app/tokens/{Address}";
        [NotMapped]
        public decimal Price { get; set; }
        [NotMapped]
        public decimal Value { get; set; }
    }
}