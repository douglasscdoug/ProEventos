using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Dashboard.Interfaces;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController(IDashboardService dashboardService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var dashboard = await dashboardService.GetDashboardAsync(User.GetUserId());
            return Ok(dashboard);
        }
    }
}