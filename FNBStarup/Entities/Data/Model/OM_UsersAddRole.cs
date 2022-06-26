using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("OM_UsersAddRole")]
    public class OM_UsersAddRole : BaseEntity
    {
        #region Constructor
        public OM_UsersAddRole()
        {
        }
        #endregion

        [Required]
        public int UserID { get; set; }

        [Required]
        public int RoleID { get; set; }
    }
}
