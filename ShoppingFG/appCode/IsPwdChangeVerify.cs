using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using ShoppingFG.models;

namespace ShoppingFG.appCode
{
    public class IsPwdChangeVerify : System.Web.UI.Page
    {
        public enum ResultMsg
        {
            /// <summary>
            /// 使用者資料沒有被改變
            /// </summary>
            PwdIsChanged,
            /// <summary>  
            /// 太久沒使用網頁Session使用者資料過期變null
            /// </summary>
            SessionIsNull
        }

        protected void Page_Init(object sender, EventArgs e)
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            if (Session["userInfo"] == null)
            {
                JObject msgReturn = new JObject();
                msgReturn.Add("SessionIsNull", true);
                msgReturn.Add("result", Convert.ToInt16(ResultMsg.SessionIsNull));
                Response.Write(msgReturn);
                Response.End();
            }

            int memberId;
            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_getSearchMemberById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                cmd.Parameters.Add(new SqlParameter("@memberId", userInfo.MemberId));
                SqlDataReader reader = cmd.ExecuteReader();
                string memberPwdCompare = "";

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        memberId = Convert.ToInt16(reader["f_id"]);
                        memberPwdCompare = reader["f_pwd"].ToString();
                    }
                }

                if (memberPwdCompare != userInfo.Pwd)
                {
                    Session.RemoveAll();
                    JObject msgReturn = new JObject();
                    msgReturn.Add("SessionIsNull", true);
                    msgReturn.Add("result", Convert.ToInt16(ResultMsg.PwdIsChanged));
                    Response.Write(msgReturn);
                    Response.End();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex.GetBaseException();
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
    }
}