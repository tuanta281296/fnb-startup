using System.ComponentModel.DataAnnotations;

namespace Entities.Data.Common
{
    public class BaseEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
    }
}
