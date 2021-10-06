using DiFe.Models;
using Microsoft.EntityFrameworkCore;

namespace DiFe.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<CoinInfo> Coins { get; set; }
        public DbSet<WebsiteInfo> Websites { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}