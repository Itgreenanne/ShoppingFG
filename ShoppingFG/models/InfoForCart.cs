using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    /// <summary>
    /// 開啟購物車所讀取的db資料儲存
    /// </summary>
    public class InfoForCart
    {
        /// <summary>
        /// 會員資訊
        /// </summary>
       // public int MemberPoints { get; set; }
        /// <summary>
        /// 產品資訊
        /// </summary>
        public List<ProductForCart> ProductInfoList { get; set; }

    }
}