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
using NLog;

namespace ShoppingFG.ajax
{
    public partial class AjaxLogin : System.Web.UI.Page
    {
        WriteLog writeLog = new WriteLog();

        /// <summary>
        /// 回傳前端的訊息代號
        /// </summary>
        public enum MsgType
        {
            ///summary
            ///輸入正確
            ///summary
            WrongLogin,
            ///summary
            ///輸入錯誤
            ///summary
            CorrectLogin,
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
            PwdLengthIsNotRight,
            /// <summary>
            /// 網路錯誤
            /// </summary>
            WrongConnection,
            /// <summary>
            /// 電話號碼長度不對
            /// </summary>
            TelLengthIsNotRight,
            /// <summary>
            /// 姓太長
            /// </summary>
            LastNameTooLong,
            /// <summary>
            /// 名太長
            /// </summary>
            FirstNameTooLong,
            /// <summary>
            /// email字元長度太長
            /// </summary>
            MailTooLong,
            /// <summary>
            /// 會員已存在
            /// </summary>
            MemberExisted,
            /// <summary>
            /// 新增會員成功
            /// </summary>
            WellAdded
        }     

        protected void Page_Load(object sender, EventArgs e)
        {
            string fnSelected = Request.QueryString["fn"];
            switch (fnSelected)
            {
                case "LoginVerify":
                    LoginVerify();
                    break;

                case "AddMember":
                    AddMember();
                    break;
            }
        }

        /// <summary>
        /// 身份驗証
        /// </summary>
        private void LoginVerify()
        {
            MsgType msgValue = MsgType.WrongLogin;
            string apiGetId = Request.Form["getId"];
            string apiGetPwd = Request.Form["getPwd"];
            UserInfo userInfo = new UserInfo();

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
                string strConnString = WebConfigurationManager.ConnectionStrings["ShoppingBG"].ConnectionString;
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
                    LogEventInfo theEvent = new LogEventInfo();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {                       
                            userInfo.Result = Convert.ToInt16(reader["result"]);
                            userInfo.MemberId = Convert.ToInt32(reader["f_id"]);
                            userInfo.IdNo = reader["f_idNumber"].ToString();
                            userInfo.Pwd = reader["f_pwd"].ToString();
                            userInfo.FirstName = reader["f_firstname"].ToString();
                            userInfo.LastName = reader["f_lastname"].ToString();
                            userInfo.Email = reader["f_mail"].ToString();
                            userInfo.Phone = reader["f_phone"].ToString();
                            userInfo.Points = Convert.ToInt32(reader["f_points"]);
                            userInfo.Level = Convert.ToInt16(reader["f_level"]);
                            userInfo.Ip = GetIp();
                        }
                        Session["userInfo"] = userInfo;
                    }
                    Response.Write(JsonConvert.SerializeObject(userInfo));
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    writeLog.Bglogger(ex.Message);
                }
                finally
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
        }

        /// <summary>
        /// 新增會員
        /// </summary>
        private void AddMember()
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            MsgType msgValue = MsgType.WrongConnection;
            string idNo = Request.Form["getidNo"];
            string tel = Request.Form["getTel"];
            string pwd = Request.Form["getPwd"];
            int gender;
            bool genderIsConToInt = int.TryParse(Request.Form["getGender"], out gender);
            string lastName = Request.Form["getLastName"];
            string firstName = Request.Form["getFirstname"];
            string birth = Request.Form["getBirth"];
            string mail = Request.Form["getMail"];
            string address = Request.Form["getAddress"];

            //空字串驗証
            if (string.IsNullOrEmpty(idNo) || string.IsNullOrEmpty(tel)
                || string.IsNullOrEmpty(pwd) || string.IsNullOrEmpty(lastName) || string.IsNullOrEmpty(firstName)
                || string.IsNullOrEmpty(birth) || string.IsNullOrEmpty(mail)
                )
            {
                msgValue = MsgType.NullEmptyInput;
                Response.Write((int)msgValue);
                //字串長度驗証
            }
            else if (idNo.Length != 10)
            {
                msgValue = MsgType.IdLengthIsNotRight;
                Response.Write((int)msgValue);
            }
            else if (tel.Length != 10)
            {
                msgValue = MsgType.TelLengthIsNotRight;
                Response.Write((int)msgValue);
            }
            else if (pwd.Length < 8 && pwd.Length > 20)
            {
                msgValue = MsgType.PwdLengthIsNotRight;
                Response.Write((int)msgValue);
            }
            else if (lastName.Length > 20)
            {
                msgValue = MsgType.LastNameTooLong;
                Response.Write((int)msgValue);
            }
            else if (firstName.Length > 20)
            {
                msgValue = MsgType.FirstNameTooLong;
                Response.Write((int)msgValue);
            }
            else if (mail.Length > 40)
            {
                msgValue = MsgType.MailTooLong;
                Response.Write((int)msgValue);
            }
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_addMember", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    cmd.Parameters.Add(new SqlParameter("@idNo", idNo));
                    cmd.Parameters.Add(new SqlParameter("@tel", tel));
                    cmd.Parameters.Add(new SqlParameter("@pwd", pwd));
                    cmd.Parameters.Add(new SqlParameter("@gender", gender));
                    cmd.Parameters.Add(new SqlParameter("@lastName", lastName));
                    cmd.Parameters.Add(new SqlParameter("@firstName", firstName));
                    cmd.Parameters.Add(new SqlParameter("@birth", birth));
                    cmd.Parameters.Add(new SqlParameter("@mail", mail));
                    cmd.Parameters.Add(new SqlParameter("@address", address));
                    SqlDataReader reader = cmd.ExecuteReader();

                    //判斷是否有此會員帳號存在
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            int result = Convert.ToInt16(reader["result"]);
                            if (result == 0)
                            {
                                msgValue = MsgType.MemberExisted;
                                break;
                            }
                            else
                            {
                                msgValue = MsgType.WellAdded;
                            }
                        }
                    }

                    Response.Write((int)msgValue);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    writeLog.Bglogger(ex.Message);
                }
                finally
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
        }

        /// <summary>
        /// 取得用戶端的ip
        /// </summary>
        /// <returns></returns>
        public string GetIp()
        {
            string ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(ip))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            return ip;
        }
    }
}