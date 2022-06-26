using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("OM_PermissionsRole")]
    public class OM_PermissionsRole : BaseEntity
    {

        #region Constructor
        public OM_PermissionsRole()
        {
        }
        #endregion

        #region Properties
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
