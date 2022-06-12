using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("SI_Occupation")]
    public class SI_Occupation
    {
        #region Properties
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The Occupation Code value cannot exceed 30 characters. ")]
        public string Occupation { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(500, ErrorMessage = "The Descr Occupation Code value cannot exceed 500 characters. ")]
        public string Descr { get; set; }
        #endregion
    }
}
