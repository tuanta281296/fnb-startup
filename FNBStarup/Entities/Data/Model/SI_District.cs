using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("SI_District")]
    public class SI_District : BaseEntity
    {
        #region Properties

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The Occupation Code value cannot exceed 30 characters. ")]
        public string Code { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(500, ErrorMessage = "The Descr Occupation Code value cannot exceed 500 characters. ")]
        public string Descr { get; set; }


        /// <summary>
        /// Country Id (foreign key)
        /// // </summary>
        [Required]
        public int CityId { get; set; }
        #endregion
    }
}
