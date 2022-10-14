using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    /// <summary>
    /// 一開啟Shopping homepage所需資料
    /// </summary>
    public class InfoForHomePage
    {
        /// <summary>
        /// 登入會員資料
        /// </summary>
        public Object UserInfo { get; set; }
        /// <summary>
        /// 產品資訊
        /// </summary>
        public List<ProductDataArray> ProductInfo { get; set; }
        /// <summary>
        /// 判斷是否為登入狀態
        /// </summary>
        public bool SessionIsNull { get; set; }
    }
}