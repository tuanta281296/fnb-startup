using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Data.Model
{
    [Table("OM_UsersAddRole")]
    public class OM_UsersAddRole
    {
        #region Constructor
        public OM_UsersAddRole()
        {
        }
        #endregion

        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public int RoleID { get; set; }
    }
}
