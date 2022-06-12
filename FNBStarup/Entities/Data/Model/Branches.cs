using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace Entities.Data.Model
{
    [Table("Branch")]
    public class Branches
    {
        #region Constructor
        public Branches()
        {
        }
        #endregion

        [Key, Column(Order = 0)]
        [Required]
        public int Id { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30, ErrorMessage = "The Occupation Code value cannot exceed 30 characters. ")]
        public string BranchID { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        [StringLength(500, ErrorMessage = "The Branch Name value cannot exceed 500 characters. ")]
        public string BranchName { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        [StringLength(500, ErrorMessage = "The Address value cannot exceed 500 characters. ")]
        public string Address { get; set; }

        public int Disctrict { get; set; }

        public int City { get; set; }

        public bool Active { get; set; }

        [NotMapped]
        public int Index { get; set; }
    }
}
