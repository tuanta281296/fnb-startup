using Repository.Command.Interface;
using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Respository
{
    public class BranchesCommand : IBranchCommand
    {
        private readonly ApplicationDbContext _context;
        public BranchesCommand(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Branches>>> GetBranches()
        {
            // first we perform the filtering...
            var branches = _context.Branch;
            // ... and then we call the ApiResult
            return await branches.ToListAsync();
        }
        public async Task<ActionResult<Branches>> PutBranches(Branches branches)
        {
            _context.Entry(branches).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return branches;
        }

        public async Task<ActionResult<Branches>> PostBranches(Branches branches)
        {
            _context.Entry(branches).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return branches;
        }

        public async Task<ActionResult<Branches>> DeleteBranches(int branchId)
        {
            var branches = _context.Branch.Where(p => p.Id == branchId).FirstOrDefault();
            _context.Entry(branches).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
            return branches;
        }

        public async Task<ActionResult<ApiResult<Branches>>> FindBranches([FromBody] QueryParamsModel<Branches> query)
        {
            int indexP = 1;
            // first we perform the filtering...
            var userRoles = _context.Branch.AsQueryable();
            foreach (var index in userRoles) 
            {
                index.Index = indexP++;
            }
            // ... and then we call the ApiResult
            return await ApiResult<Branches>.CreateAsync(
                    userRoles,
                    query);
        }
    }
}
