using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("SI_Unit")]
    public class SI_Unit
    {
        #region Properties
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The UnitType Code value cannot exceed 30 characters. ")]
        public string UnitType { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The UnitID Code value cannot exceed 30 characters. ")]
        public string UnitID { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(500, ErrorMessage = "The UnitName value cannot exceed 500 characters. ")]
        public string UnitName { get; set; }

        [ScaffoldColumn(true)]
        public bool Active { get; set; }
        #endregion
    }
}
