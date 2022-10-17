using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    public class UserInfo
    {
        /// <summary>
        /// 會員身份証字號
        /// </summary>
        public int MemberId { get; set; }
        /// <summary>
        /// 會員身份証字號
        /// </summary>
        public string IdNo { get; set; }
        /// <summary>
        /// 會員密碼
        /// </summary>
        public string Pwd { get; set; }
        /// <summary>
        /// 會員的名
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// 會員的姓
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// 會員email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 會員聯絡電話
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// 會員點數
        /// </summary>
        public int Points { get; set; }
        /// <summary>
        /// 會員等級
        /// </summary>
        public int Level { get; set; }
        /// <summary>
        /// 是否新增會員成功
        /// </summary>
        public int Result { get; set; }
    }
}