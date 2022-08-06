using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Repository.Command.Interface;
using Repository.Command.Respository;

namespace FNBStartup.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration jwtSettings)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
                };
            });

            return services;
        }

        public static IServiceCollection AddScoped(this IServiceCollection services)
        {
            services.AddScoped<IRolesCommand, RolesCommand>();
            services.AddScoped<IUsersCommand, UsersCommand>();
            services.AddScoped<IMasterDataCommand, MasterDataCommand>();
            services.AddScoped<IBranchCommand, BranchesCommand>();
            services.AddScoped<IPOProductCommand, POProductCommand>();
            services.AddScoped(typeof(IGenericCommand<>), (typeof(GenericCommand<>)));

            return services;
        }
    }
}
