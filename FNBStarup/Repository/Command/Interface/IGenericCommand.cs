using Entities.Data.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Command.Interface
{
    public interface IGenericCommand<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<ActionResult<IReadOnlyList<T>>> ListAllAsync();

        #region CRUD
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
        #endregion
    }
}
