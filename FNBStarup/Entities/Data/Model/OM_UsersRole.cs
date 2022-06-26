using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("OM_UsersRole")]
    public class OM_UsersRole : BaseEntity
    {
        #region Constructor
        public OM_UsersRole()
        {
            Permissions = new List<int>();
        }
        #endregion

        #region Properties
        /// <summary>
        /// Country name (in UTF8 format)
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Country code (in ISO 3166-1 ALPHA-2 format)
        /// </summary>
        public bool IsCoreRole { get; set; }
        #endregion

        #region Navigation Properties
        /// <summary>
        /// </summary>
        [NotMapped]
        public List<int> Permissions { get; set; }

        public static implicit operator OM_UsersRole(ActionResult<OM_UsersRole> v)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
