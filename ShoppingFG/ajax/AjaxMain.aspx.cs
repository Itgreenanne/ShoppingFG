using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShoppingFG.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ShoppingFG.ajax
{
    public partial class AjaxMain : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            JObject result = new JObject();
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;

            if (userInfo != null)
            {
                result.Add("idNo", userInfo.MemberId);
                result.Add("lastName", userInfo.LastName);
                result.Add("firstName", userInfo.FirstName);
                //result.Add("pwd", userInfo.Pwd);
                //result.Add("typeId", userInfo.TypeId);
                //result.Add("dutyId", userInfo.DutyId);
                //result.Add("dutyName", userInfo.DutyName);
                //result.Add("mangDuty", userInfo.MangDuty);
                //result.Add("mangUser", userInfo.MangUser);
                //result.Add("mangProType", userInfo.MangProType);
                //result.Add("mangProduct", userInfo.MangProduct);
                //result.Add("mangOrder", userInfo.MangOrder);
                //result.Add("mangRecord", userInfo.MangRecord);
            }
            else
            {
                result.Add("sessionIsNull", null);
            }
            Response.Write(result);
        }
    }
}