using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using ShoppingFG.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog;

namespace ShoppingFG.ajax
{
    public class WriteLog : Page
    {
        public Logger logger = LogManager.GetLogger("myLogger");
        /// <summary>
        /// 後端exception寫入log
        /// </summary>
        /// <param name="message"></param>
        public void Bglogger(string message)
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;

            if (Session["userInfo"] != null)
            {
                logger.Error("{userId}{userIp}{errorMessage}", userInfo.MemberId, userInfo.Ip, message);
            }
            else
            {
                logger.Error("{errorMessage}", message);
            }
        }
    }
}