using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model.PO
{
    [Table("PO_Product")]
    public class PO_Product
    {
        HostSetting hostSetting;
        #region Constructor
        public PO_Product()
        {
            hostSetting = new HostSetting();
        }
        #endregion
        #region Properties
        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int ProductTypeID { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(30, ErrorMessage = "The UnitID Code value cannot exceed 30 characters. ")]
        public string ProductID { get; set; }

        [ScaffoldColumn(true)]
        [StringLength(500, ErrorMessage = "The UnitName value cannot exceed 500 characters. ")]
        public string ProductName { get; set; }

        private string image;
        [ScaffoldColumn(true)]
        public string Image
        {
            get { return hostSetting.GetSettingHosting("HostSetting", "host") + image; }
            set { image = value.Replace(hostSetting.GetSettingHosting("HostSetting", "host"), ""); }
        }

        public string FolderImage
        {
            get { return image; }
        }

        [ScaffoldColumn(true)]
        [Required]
        public int DefaultUnit { get; set; }

        [ScaffoldColumn(true)]
        [Required]
        public double DefaultPrice { get; set; }

        [ScaffoldColumn(true)]
        public bool? Active { get; set; }
        #endregion
    }
}
