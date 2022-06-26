using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("OM_Permissions")]
    public class OM_Permissions : BaseEntity
    {
        #region Constructor
        public OM_Permissions()
        {
        }
        #endregion

        #region Properties
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
