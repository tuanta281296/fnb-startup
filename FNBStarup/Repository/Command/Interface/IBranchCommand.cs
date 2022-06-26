using Entities.Data;
using Entities.Data.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Entities.Data.Common.Common;

namespace Repository.Command.Interface
{
    public interface IBranchCommand
    {
        Task<ActionResult<IEnumerable<Branches>>> GetBranches();
        Task<ActionResult<Branches>> PutBranches(Branches branches);
        Task<ActionResult<Branches>> PostBranches(Branches branches);
        Task<ActionResult<Branches>> DeleteBranches(int branchid);
        Task<ActionResult<ApiResult<Branches>>> FindBranches([FromBody] QueryParamsModel<Branches> query);
    }
}
