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
    public partial class AjaxProductPage : System.Web.UI.Page
    {
        public enum ProductMsg {
            /// <summary>
            /// 網路錯誤
            /// </summary>
            WrongConnection,
            /// <summary>
            /// id不是整數
            /// </summary>
            IdIsNotInt,
            /// <summary>
            /// 產品不存在
            /// </summary>
            ProductNotExisted
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string fnselected = Request.QueryString["fn"];
            switch (fnselected) {
                case "SearchProductByIdAndLoginVerify":
                    SearchProductByIdAndLoginVerify();
                    break;

                case "SearchProductByIdForCart":
                    SearchProductByIdForCart();
                    break;
            }
        }

        private void SearchProductByIdAndLoginVerify() {
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

            ProductMsg msgValue = ProductMsg.WrongConnection;

            int apiProductId;
            bool idIsConvertToInt =int.TryParse(Request.Form["getId"], out apiProductId);
       
            if (!idIsConvertToInt)
            {
                msgValue = ProductMsg.IdIsNotInt;
                Response.Write((int)msgValue);
            }
            else
            {
                string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
                SqlConnection conn = new SqlConnection(strConnString);
                SqlCommand cmd = new SqlCommand("pro_shoppingFG_getSearchProductById", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                try
                {
                    cmd.Parameters.Add(new SqlParameter("@productId", apiProductId));
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<ProductDataArray> productArray = new List<ProductDataArray>();

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
                        infoForHomePage.ProductInfo = productArray;
                        Response.Write(JsonConvert.SerializeObject(infoForHomePage));
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
        /// 購物車用產品id從DB讀取產品資訊
        /// </summary>
        private void SearchProductByIdForCart()
        {
            string cartItem = Request.Form["getIdArray"];
            JArray ItemId = JArray.Parse(cartItem);
        }
    }
}