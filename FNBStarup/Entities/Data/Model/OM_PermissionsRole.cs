using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Data.Model
{
    [Table("OM_PermissionsRole")]
    public class OM_PermissionsRole
    {

        #region Constructor
        public OM_PermissionsRole()
        {
        }
        #endregion

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Required]
        public int RoleID { get; set; }
        /// <summary>
        /// Country name (in UTF8 format)
        /// </summary>
        [Required]
        public int PermissionsID { get; set; }
        #endregion
    }
}
