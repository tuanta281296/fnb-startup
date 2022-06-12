using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Data.Common
{
    public class HostSetting
    {
        private static IConfiguration configuration;
        public HostSetting()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            configuration = builder.Build();
        }

        public string GetSettingHosting(string section, string name)
        {
            var hostSettings = configuration.GetSection(section);
            return hostSettings.GetSection(name).Value;
        }
    }
}
