using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    /// <summary>
    /// 訂單細項內容
    /// </summary>
    public class OrderItem
    {
        public int OrderItemId { get; set; }
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
        /// 購買數量
        /// </summary>
        public int QtnForBuy { get; set; }
        /// <summary>
        /// 訂單id
        /// </summary>
        public int OrderId { get; set; }
    }
}