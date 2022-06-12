using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Reflection;
using static Entities.Data.Common.Common;

namespace Entities.Data
{
    public class ApiResult<T>
    {
        private ApiResult(
            QueryParamsModel<T> pages,
            List<T> data,
            int count)
        {
            Pages = pages;
            Items = data;
            TotalCount = count;
        }
        #region Methods
        /// <summary>
        /// Pages a IQueryable source.
        /// </summary>
        /// <param name="source">An IQueryable source of generic 
        /// type</param>
        /// <param name="pageIndex">Zero-based current page index 
        /// (0 = first page)</param>
        /// /// <param name="pageSize">The actual size of each 
        /// page</param>
        /// <returns>
        /// A object containing the paged result 
        /// and all the relevant paging navigation info.
        /// </returns>
        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source,
            QueryParamsModel<T> pages)
        {
            var count = await source.CountAsync();
            if (!string.IsNullOrEmpty(pages.SortField)
                && IsValidProperty(pages.SortField))
            {
                pages.SortOrder = !string.IsNullOrEmpty(pages.SortOrder)
                    && pages.SortOrder.ToUpper() == "ASC"
                    ? "ASC"
                    : "DESC";
                source = source.OrderBy(
                    string.Format(
                        "{0} {1}",
                        pages.SortField,
                        pages.SortOrder)
                    );
            }
            source = source
                .Skip(pages.PageNumber * pages.PageSize)
                .Take(pages.PageSize);

            var data = await source.ToListAsync();

            return new ApiResult<T>(
                pages,
                data,
                count);
        }
        #endregion
        #region Properties
        public static bool IsValidProperty(
            string propertyName,
            bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    string.Format(
                        "ERROR: Property '{0}' does not exist.",
                        propertyName)
                    );
            return prop != null;
        }

        public List<T> Items { get; private set; }
        public QueryParamsModel<T> Pages { get; private set; }
        public int TotalCount { get; private set; }
        #endregion
    }
}