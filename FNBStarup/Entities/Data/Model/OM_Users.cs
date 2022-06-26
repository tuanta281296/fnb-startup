using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Data.Common;

namespace Entities.Data.Model
{
    [Table("OM_Users")]
    public class OM_Users : BaseEntity
    {
        HostSetting hostSetting;
        #region Constructor
        public OM_Users()
        {
            hostSetting = new HostSetting();
            Roles = new List<int>();
            Address = new AR_Address();
        }
        #endregion

        #region Properties

        public string Username { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }

        public string AccessToken { get; set; }
        private string pic;
        public string Pic
        {
            get { return hostSetting.GetSettingHosting("HostSetting", "host") + pic; }
            set { pic =  value.Replace(hostSetting.GetSettingHosting("HostSetting", "host"), ""); }
        }

        public string FolderPic
        {
            get { return pic; }
        }

        public string Fullname { get; set; }

        public string RefreshToken { get; set; }
        public string Occupation { get; set; }
        public int BranchID { get; set; }

        public string Phone { get; set; }

        [NotMapped]
        public AR_Address Address { get; set; }

        [NotMapped]
        public List<int> Roles { get; set; }
        #endregion
    }
}
