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
        /// 會員的名
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// 會員的姓
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// 是否新增會員成功
        /// </summary>
        public int Result { get; set; }     
    }
}