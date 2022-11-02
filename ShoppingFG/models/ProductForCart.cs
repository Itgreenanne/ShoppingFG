using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    /// <summary>
    /// 購物車中從db讀取產品資訊儲存的類
    /// </summary>
    public class ProductForCart
    {
        /// <summary>
        /// 產品id
        /// </summary>
        public int ProductId { get; set; }
        /// <summary>
        /// 產品標題
        /// </summary>
        public string ProductTitle { get; set; }
        /// <summary>
        /// 產品單價
        /// </summary>
        public int ProductUnitPrice { get; set; }
        /// <summary>
        /// 產品購買數量
        /// </summary>
        public int ProductQtn { get; set; }
    }
}