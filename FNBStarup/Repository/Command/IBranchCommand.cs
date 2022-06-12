using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command
{
    public interface IBranchCommand
    {
        Task<ActionResult<IEnumerable<Branches>>> GetBranches(ApplicationDbContext _context);
        Task<ActionResult<Branches>> PutBranches(Branches branches, ApplicationDbContext _context);
        Task<ActionResult<Branches>> PostBranches(Branches branches, ApplicationDbContext _context);
        Task<ActionResult<Branches>> DeleteBranches(int branchid, ApplicationDbContext _context);
        Task<ActionResult<ApiResult<Branches>>> FindBranches([FromBody] QueryParamsModel<Branches> query, ApplicationDbContext _context);
    }
}
