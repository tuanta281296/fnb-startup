using Entities.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Data.Common
{
    public class Common
    {
        public class QueryParamsModel<T>
        {
            public T Filter { get; set; }
            public string SortOrder { get; set; }
            public string SortField { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
        }
    }
}
