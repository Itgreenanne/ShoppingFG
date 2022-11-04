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

namespace ShoppingFG.ajax
{
    public partial class AjaDbDataChangVerify : System.Web.UI.Page
    {
        /// <summary>
        /// 回傳sesson與讀取DB比較後的結果訊息
        /// </summary>
        public enum resultMsg {
            /// <summary>
            /// 密碼被改變
            /// </summary>
            PwdIsChanged,
            /// <summary>
            /// Session是null的狀態
            /// </summary>
            SessionIsNull
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;

            if (Session["userInfo"] == null)
            {
                JObject msgReturn = new JObject();
                msgReturn.Add("SessionIsNull", true);
                msgReturn.Add("result", Convert.ToInt16(resultMsg.SessionIsNull));
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
                string memberLastNameCompare = "";
                string memberFirstNameCompare = "";
                int memberPointsCompare = 0;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        memberId = Convert.ToInt16(reader["f_id"]);
                        memberPwdCompare = reader["f_pwd"].ToString();
                        memberLastNameCompare = reader["f_lastname"].ToString();
                        memberFirstNameCompare = reader["f_firstname"].ToString();
                        memberPointsCompare = Convert.ToInt32(reader["f_points"]);
                    }
                }

                if (memberPwdCompare != userInfo.Pwd)
                {
                    Session.RemoveAll();
                    JObject msgReturn = new JObject();
                    msgReturn.Add("SessionIsNull", true);
                    msgReturn.Add("result", Convert.ToInt16(resultMsg.PwdIsChanged));
                    Response.Write(msgReturn);
                    Response.End();
                }
                else if (memberLastNameCompare != userInfo.LastName || memberFirstNameCompare != userInfo.FirstName || memberPointsCompare != userInfo.Points) 
                {
                    userInfo.LastName = memberLastNameCompare;
                    userInfo.FirstName = memberFirstNameCompare;
                    userInfo.Points = memberPointsCompare;
                    Session["userInfo"] = userInfo;
                    Response.Write(JsonConvert.SerializeObject(userInfo));
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