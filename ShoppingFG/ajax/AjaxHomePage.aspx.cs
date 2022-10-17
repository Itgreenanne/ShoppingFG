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
    public partial class AjaxHomePage : IsPwdChangeVerify
    { 

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
            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_getAllProduct", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                SqlDataReader reader = cmd.ExecuteReader();
                List<ProductDataArray> productArray = new List<ProductDataArray>();

                //判斷是否有此職責存在
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        ProductDataArray productInfo = new ProductDataArray();
                        productInfo.ProductId = Convert.ToInt16(reader["f_id"]);
                        productInfo.ProductPic = reader["f_picturePath"].ToString();
                        productInfo.ProductTitle = reader["f_title"].ToString();
                        productInfo.ProductUnitPrice = Convert.ToInt16(reader["f_unitprice"]);
                        productInfo.ProductQtn = Convert.ToInt16(reader["f_quantity"]);
                        productInfo.ProductTypeId = Convert.ToInt16(reader["f_typeId"]);
                        productInfo.ProductDetail = reader["f_detail"].ToString();
                        productInfo.ProductTypeName = reader["f_name"].ToString();
                        productArray.Add(productInfo);
                    }
                }
                infoForHomePage.ProductInfo = productArray;               
                Response.Write(JsonConvert.SerializeObject(infoForHomePage));
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