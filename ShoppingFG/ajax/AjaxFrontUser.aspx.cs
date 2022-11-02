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
using ShoppingFG.appCode;

namespace ShoppingFG.ajax
{
    public partial class AjaxFrontUser : IsPwdChangeVerify
    {
        public enum MsgType
        {
            /// <summary>
            /// 修改人員成功
            /// </summary>
            WellModified,
            /// <summary>
            /// 此人員已存在
            /// </summary>
            MemberExisted,
            /// <summary>
            /// 空字串或是所有選項都沒勾選
            /// </summary>
            NullEmptyInput,
            /// <summary>
            /// 身份証字號長度不對
            /// </summary>
            IdLengthIsNotRight,
            /// <summary>
            /// 電話號碼長度不對 
            /// </summary>
            TelLengthIsNotRight,
            /// <summary>
            /// 密碼長度不對 
            /// </summary>
            PwdLengthIsNotRight,
            /// <summary>
            /// 人員不存在
            /// </summary>
            UserNotExisted,
            /// <summary>
            /// 人員修改成功
            /// </summary>
            UserModified,
            /// <summary>
            /// 網路錯誤
            /// </summary>
            WrongConnection,
            /// <summary>
            /// 姓太長
            /// </summary>
            LastNameTooLong,
            /// <summary>
            /// 名太長
            /// </summary>
            FirstNameTooLong,
            /// <summary>
            /// email長度太長
            /// </summary>
            MailTooLong,
            /// <summary>
            /// Id無法被轉換成int
            /// </summary>
            IdIsNotConvToInt,
            /// <summary>
            /// 會員帳號不存在
            /// </summary>
            MemberNotExisted
        }
        protected void Page_Load(object sender, EventArgs e)
        {

            string fnSelected = Request.QueryString["fn"];
            switch (fnSelected)
            {
                case "GetSearchMemberById":
                    GetSearchMemberById();
                    break;

                case "ModifyMember":
                    ModifyMember();
                    break;

                case "GetOrder":
                    GetOrder();
                    break;

                case "Logout":
                    Logout();
                    break;
            }
        }

        /// <summary>
        /// 會員修改視窗中用來搜尋選中會員的資料
        /// </summary>     
        private void GetSearchMemberById() {
            MsgType msgValue = MsgType.WrongConnection;
            int apiMemberId = 0;
            bool idIsConvToInt = int.TryParse(Request.Form["getMemberId"], out apiMemberId);

            if (!idIsConvToInt)
            {
                msgValue = MsgType.IdIsNotConvToInt;
                Response.Write((int)msgValue);
            }
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_getSearchMemberById", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    cmd.Parameters.Add(new SqlParameter("@memberId", apiMemberId));
                    SqlDataReader reader = cmd.ExecuteReader();
                    JObject memberInfo = new JObject();

                    //判斷是否有此職責存在
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            memberInfo.Add("memberId", Convert.ToInt16(reader["f_id"]));
                            memberInfo.Add("lastname", reader["f_lastname"].ToString());
                            memberInfo.Add("firstname", reader["f_firstname"].ToString());
                            memberInfo.Add("gender", Convert.ToInt16(reader["f_gender"]));
                            memberInfo.Add("birth", reader["f_birthday"].ToString());
                            memberInfo.Add("pwd", reader["f_pwd"].ToString());
                            memberInfo.Add("mail", reader["f_mail"].ToString());
                            memberInfo.Add("phone", reader["f_phone"].ToString());
                            memberInfo.Add("address", reader["f_address"].ToString());
                            memberInfo.Add("points", Convert.ToInt32(reader["f_points"]));
                            memberInfo.Add("level", Convert.ToInt16(reader["f_level"]));
                        }
                        Response.Write(memberInfo);
                    }
                    else
                    {
                        msgValue = MsgType.MemberNotExisted;
                        Response.Write((int)msgValue);
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

        /// <summary>
        /// 帳號設定修改
        /// </summary>
        private void ModifyMember() {
            MsgType msgValue = MsgType.WrongConnection;
            string tel = Request.Form["getTel"];
            string pwd = Request.Form["getPwd"];
            string gender = Request.Form["getGender"];
            string lastName = Request.Form["getLastName"];
            string firstName = Request.Form["getFirstname"];
            string birth = Request.Form["getBirth"];
            string mail = Request.Form["getMail"];
            string address = Request.Form["getAddress"];
            int apiId = 0;
            bool idIsConvToInt = int.TryParse(Request.Form["getId"], out apiId);
            int apiLevel = 0;
            bool levelIsConvToInt = int.TryParse(Request.Form["getLevel"], out apiLevel);
            int apiPoints = 0;
            bool pointsIsConvToInt = int.TryParse(Request.Form["getPoints"], out apiPoints);


            //空字串驗証
            if (string.IsNullOrEmpty(tel) || string.IsNullOrEmpty(pwd) || string.IsNullOrEmpty(gender)
                || string.IsNullOrEmpty(lastName) || string.IsNullOrEmpty(firstName)
                || string.IsNullOrEmpty(birth) || string.IsNullOrEmpty(mail))
            {
                msgValue = MsgType.NullEmptyInput;
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
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_modifyMember", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    cmd.Parameters.Add(new SqlParameter("@id", apiId));
                    cmd.Parameters.Add(new SqlParameter("@tel", tel));
                    cmd.Parameters.Add(new SqlParameter("@pwd", pwd));
                    cmd.Parameters.Add(new SqlParameter("@gender", gender));
                    cmd.Parameters.Add(new SqlParameter("@lastName", lastName));
                    cmd.Parameters.Add(new SqlParameter("@firstName", firstName));
                    cmd.Parameters.Add(new SqlParameter("@birth", birth));
                    cmd.Parameters.Add(new SqlParameter("@mail", mail));
                    cmd.Parameters.Add(new SqlParameter("@address", address));
                    cmd.Parameters.Add(new SqlParameter("@level", apiLevel));
                    cmd.Parameters.Add(new SqlParameter("@points", apiPoints));
                    SqlDataReader reader = cmd.ExecuteReader();

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
                                msgValue = MsgType.WellModified;
                            }
                        }
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


        /// <summary>
        /// 讀取此會員所有訂單
        /// </summary>
        private void GetOrder() {
            int memberId = 0;
            bool idIsInt = int.TryParse(Request.Form["getMemberId"].ToString(), out memberId);
            MsgType msgValue = new MsgType();

            if (!idIsInt)
            {
                msgValue = MsgType.IdIsNotConvToInt;
                Response.Write((int)msgValue);
            }
            else 
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_getOrderByMemberId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    cmd.Parameters.Add(new SqlParameter("@memberId", memberId));
                    //從Command取得資料存入dataAdapter
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    //創一個dataset的記憶體資料集
                    DataSet ds = new DataSet();
                    //將dataAdapter資料存入dataset
                    adapter.Fill(ds);
                    DataTable dt = new DataTable();
                    ///讀取訂單表格
                    dt = ds.Tables[0];
                    OrderInfo orderInfo = new OrderInfo();
                    List<OtherInfo> otherInfoArray = new List<OtherInfo>();

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow row = dt.Rows[i];
                        OtherInfo otherInfo = new OtherInfo()
                        {
                            OrderId = Convert.ToInt16(row.ItemArray[0]),
                            OrderNo = row.ItemArray[1].ToString(),
                            OrderTotalPrice = Convert.ToInt16(row.ItemArray[2]),
                            OrderCreatedTime = row.ItemArray[3].ToString()
                        }; otherInfoArray.Add(otherInfo);                        
                    }

                    dt = ds.Tables[1];
                    List<OrderItem> orderItemArray = new List<OrderItem>();

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow row = dt.Rows[i];
                        OrderItem orderItem = new OrderItem()
                        {
                            OrderItemId = Convert.ToInt16(row.ItemArray[0]),
                            OrderId = Convert.ToInt16(row.ItemArray[1]),
                            ProductId = Convert.ToInt16(row.ItemArray[2]),
                            ProductTitle = row.ItemArray[3].ToString(),
                            QtnForBuy = Convert.ToInt16(row.ItemArray[4]),
                            ProductUnitPrice = Convert.ToInt16(row.ItemArray[5]),
                        }; orderItemArray.Add(orderItem);
                    }
                    orderInfo.InfoList = otherInfoArray;
                    orderInfo.OrderList = orderItemArray;
                    Response.Write(JsonConvert.SerializeObject(orderInfo));
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

        /// <summary>
        /// 會員登出
        /// </summary>
        private void Logout()
        {
            Session.RemoveAll();
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetNoServerCaching();
            HttpContext.Current.Response.Cache.SetNoStore();
         
        }       
    }
}