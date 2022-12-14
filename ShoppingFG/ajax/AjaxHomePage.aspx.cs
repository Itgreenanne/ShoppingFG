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
using NLog;
using NLog.Fluent;

namespace ShoppingFG.ajax
{
    public partial class AjaxHomePage : System.Web.UI.Page
    {
        WriteLog writeLog = new WriteLog();
        private Logger fLogger = LogManager.GetLogger("fLogger");

        public enum ProductMsg
        {
            /// <summary>
            /// 網路錯誤
            /// </summary>
            WrongConnection,
            /// <summary>
            /// 沒有任何輸入
            /// </summary>
            NullEmptyInput,
            /// <summary>
            /// 標題字串太長
            /// </summary>
            TitleToolongString,
            /// <summary>
            /// 詳情字串太長
            /// </summary>
            DetailToolongString,
            /// <summary>
            /// 單價不是int型式或>0
            /// </summary>
            PriceIsNotIntOrPositive,
            /// <summary>
            /// 數量不是int型式或 >= 0
            /// </summary>
            QtnIsNotIntOrPositive,
            /// <summary>
            /// 產品類別不是int型式
            /// </summary>
            IdIsNotConvToInt,
            /// <summary>
            /// 產品id不是int型式
            /// </summary>
            ProductIdIsNotConvToInt,
            /// <summary>
            /// 產品已新增
            /// </summary>
            WellAdded,
            /// <summary>
            /// 產品不存在
            /// </summary>
            ProductNotExisted,
            /// <summary>
            /// 產品資料已被修改
            /// </summary>
            ProductModified
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string fnselected = Request.QueryString["fn"];
            switch (fnselected)
            {
                case "LoginVerifyAndGetAllProduct":
                    LoginVerifyAndGetAllProduct();
                    break;
                case "GetSearchProduct":
                    GetSearchProduct();
                    break;
                case "WriteFrontErrorLog":
                    WriteFrontErrorLog();
                    break;
            }
        }
        private void LoginVerifyAndGetAllProduct()
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            InfoForHomePage infoForHomePage = new InfoForHomePage();
            if (userInfo != null)
            {
                infoForHomePage.UserInfo = userInfo;
            }
            else
            {
               infoForHomePage.SessionIsNull = true;
            }
            int qtn;
            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_getAllProduct", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                SqlDataReader reader = cmd.ExecuteReader();
                List<ProductDataArray> productArray = new List<ProductDataArray>();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        if ((qtn = Convert.ToInt32(reader["f_quantity"])) > 0)
                        {
                            ProductDataArray productInfo = new ProductDataArray();
                            productInfo.ProductId = Convert.ToInt32(reader["f_id"]);
                            productInfo.ProductPic = reader["f_picturePath"].ToString();
                            productInfo.ProductTitle = reader["f_title"].ToString();
                            productInfo.ProductUnitPrice = Convert.ToInt32(reader["f_unitprice"]);
                            productInfo.ProductQtn = qtn;
                            productInfo.ProductTypeId = Convert.ToInt32(reader["f_typeId"]);
                            productInfo.ProductDetail = reader["f_detail"].ToString();
                            productInfo.ProductTypeName = reader["f_name"].ToString();
                            productArray.Add(productInfo);
                        }
                    }
                }
                infoForHomePage.ProductInfo = productArray;               
                Response.Write(JsonConvert.SerializeObject(infoForHomePage));
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

        /// <summary>
        /// 用關鍵字模糊搜尋產品標題符合的產品
        /// </summary>
        private void GetSearchProduct()
        {
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            ProductMsg msgValue = ProductMsg.WrongConnection;
            string apiProductTitle = Request.Form["getProductTitle"];

            if (string.IsNullOrEmpty(apiProductTitle))
            {
                msgValue = ProductMsg.NullEmptyInput;
                Response.Write((int)msgValue);
            }
            else if (apiProductTitle.Length > 100)
            {
                msgValue = ProductMsg.TitleToolongString;
                Response.Write((int)msgValue);
            }       
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_getSearchProduct2", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    //if(!string.IsNullOrEmpty(apiUserAccount) && apiDutyId != 0)
                    cmd.Parameters.Add(new SqlParameter("@productTitle", apiProductTitle));
                    SqlDataReader reader = cmd.ExecuteReader();
                    JArray resultArray = new JArray();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            JObject productInfo = new JObject();
                            productInfo.Add("ProductId", Convert.ToInt32(reader["f_id"]));
                            productInfo.Add("ProductPic", reader["f_picturePath"].ToString());
                            productInfo.Add("ProductTitle", reader["f_title"].ToString());
                            productInfo.Add("ProductUnitPrice", Convert.ToInt32(reader["f_unitprice"]));
                            productInfo.Add("ProductQtn", Convert.ToInt32(reader["f_quantity"]));
                            productInfo.Add("ProductTypeId", Convert.ToInt32(reader["f_typeId"]));
                            productInfo.Add("ProductDetail", reader["f_detail"].ToString());
                            productInfo.Add("ProductTypeName", reader["f_name"].ToString());
                            resultArray.Add(productInfo);
                        }
                        Response.Write(resultArray);
                    }
                    else
                    {
                        msgValue = ProductMsg.ProductNotExisted;
                        Response.Write((int)msgValue);
                    }
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
        /// 將前端傳入的錯誤訊息寫到日詩裡
        /// </summary>
        private void WriteFrontErrorLog()
        {
            string filename = Request.Form["getFilename"];
            string row = Request.Form["getRow"];
            string col = Request.Form["getCol"];
            string msg = Request.Form["getMsg"];
            string localTime = Request.Form["getTime"];
            string browserName = Request.Form["getBrowserName"];
            string device = Request.Form["getDevice"];
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            if (Session["userInfo"] != null)
            {
                fLogger.Error("{userId}{userIp}{filename}{row}{col}{msg}{localTime}{browser}{deviceOs}", userInfo.MemberId, userInfo.Ip, filename, row, col, msg, localTime, browserName, device);
            }
            else {
                fLogger.Error("{filename}{row}{col}{msg}{localTime}{browser}{deviceOs}", filename, row, col, msg, localTime, browserName, device);

            }
            //theEvent.Properties["來源"] = filename;
            //theEvent.Properties["列數"] = row;
            //theEvent.Properties["行數"] = col;
            //theEvent.Properties["錯誤訊息"] = msg;
        }

    
    }
}