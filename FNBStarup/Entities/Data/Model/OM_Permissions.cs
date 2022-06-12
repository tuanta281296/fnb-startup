using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Data.Model
{
    [Table("OM_Permissions")]
    public class OM_Permissions
    {
        #region Constructor
        public OM_Permissions()
        {
        }
        #endregion

        #region Properties
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }
        /// <summary>
        /// Country name (in UTF8 format)
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Country code (in ISO 3166-1 ALPHA-2 format)
        /// </summary>
        public int Level { get; set; }
        /// <summary>
        /// Country code (in ISO 3166-1 ALPHA-3 format)
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Country code (in ISO 3166-1 ALPHA-3 format)
        /// </summary>
        public int ParentId { get; set; }
        #endregion
    }
}
