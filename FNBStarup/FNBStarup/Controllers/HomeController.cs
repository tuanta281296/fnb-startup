using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FNBStarup.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }
    }
}
