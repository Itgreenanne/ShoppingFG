using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    public class OtherInfo
    {
        /// <summary>
        /// 訂單id
        /// </summary>
        public int OrderId { get; set; }
        /// <summary>
        /// 訂單編號
        /// </summary>
        public string OrderNo { get; set; }
        /// <summary>
        /// 訂單建立時間
        /// </summary>
        public string OrderCreatedTime { get; set; }
    }
}