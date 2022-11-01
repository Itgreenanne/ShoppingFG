using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;

namespace ShoppingBG.ajax
{
    public partial class ajaxLogin : System.Web.UI.Page
    {
        ///用enum新增登入狀態
        public enum msgType
        {
            /// <summary>
            /// 輸入正確
            /// </summary>
            correctLogin,
            ///summary
            ///輸入錯誤
            ///summary
            wrongLogin,
            ///summary
            ///空字串請重新輸入
            //////summary
            NullEmptyInput,
            ///summary
            ///資料庫無資料
            //////summary
            NullEmptyDb
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            LoginVerify();
        }

        ///登入帳密驗証
        private void LoginVerify()
        {

            string apiGetId = Request.Form["getId"];
            string apiGetPwd = Request.Form["getPwd"];
            msgType msgValue = msgType.wrongLogin;

            if (string.IsNullOrEmpty(apiGetId) || string.IsNullOrEmpty(apiGetPwd))
            {
                Response.Write((int)msgType.NullEmptyInput);
            }
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("beginningSP ", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    //將 CommandText 傳送至 Connection，並使用其中一個 CommandBehavior 值來建置 SqlDataReader
                    //當DataReader關閉的時候，也會自動關閉資料庫的連結
                    SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            string getDbId = (string)reader["f_account"];
                            string getDbPwd = (string)reader["f_pwd"];

                            if (getDbId == apiGetId && getDbPwd == apiGetPwd)
                            {
                                msgValue = msgType.correctLogin;
                                break;
                            }
                        }
                    } else {
                        msgValue=msgType.NullEmptyDb;
                    }

                    Response.Write((int)msgValue);
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
