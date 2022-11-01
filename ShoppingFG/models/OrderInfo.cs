using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingFG.models
{
    public class OrderInfo
    {   
        public List<OtherInfo> InfoList { get; set; }
         /// <summary>
        /// 訂單細項
        /// </summary>
        public List<OrderItem> OrderList { get; set; }
    }
}