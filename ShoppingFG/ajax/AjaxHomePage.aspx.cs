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

namespace ShoppingFG.ajax
{
    public partial class AjaxHomePage : System.Web.UI.Page
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
                case "GetAllProduct":
                    GetAllProduct();
                    break;
            }
        }
        private void GetAllProduct()
        {
            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_getAllProduct", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                SqlDataReader reader = cmd.ExecuteReader();
                JArray resultArray = new JArray();

                //判斷是否有此職責存在
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        JObject productInfo = new JObject();
                        productInfo.Add("ProductId", Convert.ToInt16(reader["f_id"]));
                        productInfo.Add("ProductPic", reader["f_picturePath"].ToString());
                        productInfo.Add("ProductTitle", reader["f_title"].ToString());
                        productInfo.Add("ProductUnitPrice", Convert.ToInt16(reader["f_unitprice"]));
                        productInfo.Add("ProductQtn", Convert.ToInt16(reader["f_quantity"]));
                        productInfo.Add("ProductTypeId", Convert.ToInt16(reader["f_typeId"]));
                        productInfo.Add("ProductDetail", reader["f_detail"].ToString());
                        productInfo.Add("ProductTypeName", reader["f_name"].ToString());
                        resultArray.Add(productInfo);
                    }
                }
                Response.Write(resultArray);
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