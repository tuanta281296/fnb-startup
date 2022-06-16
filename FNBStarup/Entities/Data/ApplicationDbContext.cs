using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Entities.Data.Model;
using Entities.Data.Model.PO;

namespace Entities.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base()
        {
        }
        public ApplicationDbContext(DbContextOptions options)
        : base(options)
        {
        }
        public DbSet<OM_UsersRole> OM_UsersRole { get; set; }
        public DbSet<OM_Permissions> OM_Permissions { get; set; }
        public DbSet<OM_PermissionsRole> OM_PermissionsRole { get; set; }
        public DbSet<AR_Address> AR_Address { get; set; }
        public DbSet<OM_Users> OM_Users { get; set; }
        public DbSet<OM_UsersAddRole> OM_UsersAddRole { get; set; }
        public DbSet<SI_Occupation> SI_Occupation { get; set; }
        public DbSet<SI_District> SI_District { get; set; }
        public DbSet<SI_City> SI_City { get; set; }
        public DbSet<Branches> Branch { get; set; }
        public DbSet<PO_ProductType> PO_ProductType { get; set; }
        public DbSet<SI_Unit> SI_Unit { get; set; }
        public DbSet<PO_Product> PO_Product { get; set; }
    }
}
