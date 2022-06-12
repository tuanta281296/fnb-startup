using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("PO_ProductType")]
    public class PO_ProductType
    {
        #region Properties
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The Product Type Code value cannot exceed 30 characters. ")]
        public string Code { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(500, ErrorMessage = "The Descr Product Type value cannot exceed 500 characters. ")]
        public string Descr { get; set; }
        #endregion
    }
}
