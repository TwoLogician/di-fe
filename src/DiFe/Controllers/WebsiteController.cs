using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiFe.Data;
using DiFe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiFe.Controllers
{
    [Route("api/[controller]")]
    public class WebsiteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WebsiteController(AppDbContext context) => _context = context;

        [HttpGet("Wallet/{wallet}")]
        public async Task<ActionResult<List<WebsiteInfo>>> GetByWallet(string wallet)
        {
            try
            {
                var websites = await _context.Websites.Where(x => x.Wallet.ToUpper() == wallet.ToUpper()).ToListAsync();
                return websites;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<WebsiteInfo>> Post([FromBody] WebsiteInfo value)
        {
            try
            {
                if (value is null)
                {
                    return BadRequest();
                }
                var website = new WebsiteInfo();
                website.Name = value.Name ?? string.Empty;
                website.Url = value.Url ?? string.Empty;
                website.Wallet = value.Wallet ?? string.Empty;
                await _context.Websites.AddAsync(website);
                await _context.SaveChangesAsync();
                return website;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<WebsiteInfo>> Put(string id, [FromBody] WebsiteInfo value)
        {
            try
            {
                if (value is null)
                {
                    return BadRequest();
                }
                var website = await _context.Websites.FirstOrDefaultAsync(x => x.Id == id);
                if (website is null)
                {
                    return BadRequest(new ExceptionInfo("That website doesn't exist."));
                }
                website.Name = value.Name ?? string.Empty;
                website.Url = value.Url ?? string.Empty;
                website.Wallet = value.Wallet ?? string.Empty;
                await _context.SaveChangesAsync();
                return website;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                var website = await _context.Websites.FirstOrDefaultAsync(x => x.Id == id);
                if (website is null)
                {
                    return BadRequest(new ExceptionInfo("That website doesn't exist."));
                }
                _context.Websites.Remove(website);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}