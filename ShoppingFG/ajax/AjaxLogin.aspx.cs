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
using ShoppingFG.appCode;


namespace ShoppingFG.ajax
{
    public partial class AjaxLogin : IsPwdChangeVerify
    {
        public enum MsgType
        {
            ///summary
            ///輸入正確
            ///summary
            CorrectLogin,
            ///summary
            ///輸入錯誤
            ///summary
            WrongLogin,
            ///summary
            ///空字串請重新輸入
            NullEmptyInput,
            /// <summary>
            /// 身份証字號長度錯誤
            /// </summary>
            IdLengthIsNotRight,
            /// <summary>
            /// 密碼長度錯誤
            /// </summary>
            PwdLengthIsNotRight
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string fnSelected = Request.QueryString["fn"];
            switch (fnSelected)
            {
                case "LoginVerify":
                    LoginVerify();
                    break;
            }
        }

        private void LoginVerify()
        {
            MsgType msgValue = MsgType.WrongLogin;
            string apiGetId = Request.Form["getId"];
            string apiGetPwd = Request.Form["getPwd"];

            //後端空字串驗証
            if (string.IsNullOrEmpty(apiGetId) || string.IsNullOrEmpty(apiGetPwd))
            {
                msgValue = MsgType.NullEmptyInput;
                Response.Write((int)msgValue);

                //字串長度是否有超過限制驗証
            }
            //else if (apiGetId.Length != 10)
            //{
            //    msgValue = MsgType.IdLengthIsNotRight;
            //    Response.Write((int)msgValue);
            //}
            //else if (apiGetPwd.Length < 8 && apiGetPwd.Length > 20)
            //{
            //    msgValue = MsgType.PwdLengthIsNotRight;
            //    Response.Write((int)msgValue);
            //}
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_getLogin", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    //將登入頁輸入的帳號與密碼傳至beginningSP
                    cmd.Parameters.Add(new SqlParameter("@idNo", apiGetId));
                    cmd.Parameters.Add(new SqlParameter("@pwd", apiGetPwd));
                    SqlDataReader reader = cmd.ExecuteReader();
                    UserInfo userInfo = new UserInfo();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            userInfo.Result = Convert.ToInt16(reader["result"]);
                            userInfo.MemberId = Convert.ToInt16(reader["f_id"]);
                            userInfo.IdNo = reader["f_idNumber"].ToString();
                            userInfo.Pwd = reader["f_pwd"].ToString();
                            userInfo.FirstName = reader["f_firstname"].ToString();
                            userInfo.LastName = reader["f_lastname"].ToString();
                            userInfo.Email = reader["f_mail"].ToString();
                            userInfo.Phone = reader["f_phone"].ToString();
                            userInfo.Points = Convert.ToInt16(reader["f_points"]);
                            userInfo.Level = Convert.ToInt16(reader["f_level"]);
                        }
                        Session["userInfo"] = userInfo;
                    }
                    Response.Write(JsonConvert.SerializeObject(userInfo));
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
}