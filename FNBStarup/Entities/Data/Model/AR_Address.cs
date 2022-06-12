using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entities.Data.Model
{
    [Table("AR_Address")]
    public class AR_Address
    {
        #region Constructor
        public AR_Address()
        {
        }
        #endregion
        [Key]
        [Required]
        public int UserID { get; set; }
        public string AddressLine { get; set; }
        public int District { get; set; }
        public int City { get; set; }
        public string Ward { get; set; }
    }
}
