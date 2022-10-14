using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    public class ProductDataArray
    {
        /// <summary>
        /// 產品id
        /// </summary>
        public int ProductId { get; set; }
        /// <summary>
        /// 產品圖片路徑
        /// </summary>
        public string ProductPic { get; set; }
        /// <summary>
        /// 產品標題
        /// </summary>
        public string ProductTitle { get; set; }
        /// <summary>
        /// 產品單價
        /// </summary>
        public int ProductUnitPrice { get; set;}
        /// <summary>
        /// 產品數量
        /// </summary>
        public int ProductQtn { get; set; }
        /// <summary>
        /// 產品類別id
        /// </summary>
        public int ProductTypeId { get; set; }
        /// <summary>
        /// 產品詳情
        /// </summary>
        public string ProductDetail { get; set; }
        /// <summary>
        /// 產品類別名稱
        /// </summary>
        public string ProductTypeName { get; set; }
    }
}