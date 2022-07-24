using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entities.Data;
using Entities.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Command.Interface;

namespace Repository.Command.Respository
{
    public class GenericCommand<T> : IGenericCommand<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        public GenericCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<ActionResult<IReadOnlyList<T>>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        #region CRUD
        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
        #endregion
    }
}
