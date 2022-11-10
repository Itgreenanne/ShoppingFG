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
            ProductNotExisted,
            /// <summary>
            /// 身份証字號是空字串或字串太長
            /// </summary>
            IdNoStringIsNullOrTooLong,
            /// <summary>
            /// 購買數量不是數字
            /// </summary>
            QtnIsNotInt,
            /// <summary>
            /// 價錢不是數字
            /// </summary>
            PriceIsNotInt,
            /// <summary>
            /// 訂單建立成功
            /// </summary>
            OrderCreated,
            /// <summary>
            /// 訂單沒有建立成功
            /// </summary>
            OrderNotCreated
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

                case "AddOrder":
                    AddOrder();
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
                            productInfo.ProductId = Convert.ToInt32(reader["f_id"]);
                            productInfo.ProductPic = reader["f_picturePath"].ToString();
                            productInfo.ProductTitle = reader["f_title"].ToString();
                            productInfo.ProductUnitPrice = Convert.ToInt32(reader["f_unitprice"]);
                            productInfo.ProductQtn = Convert.ToInt32(reader["f_quantity"]);
                            productInfo.ProductTypeId = Convert.ToInt32(reader["f_typeId"]);
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
            UserInfo userInfo = Session["userInfo"] != null ? (UserInfo)Session["userInfo"] : null;
            string cartItem = Request.Form["getIdArray"];
            JArray itemId = JArray.Parse(cartItem);
            ProductMsg msgValue = ProductMsg.WrongConnection;
            string temp;
            int id;
            List<int> productId = new List<int>();
            bool idIsInt;

            //驗証產品id是否可轉為int
            for (int i = 0; i < itemId.Count; i++) 
            {
                temp = itemId[i].ToString();
                idIsInt = int.TryParse(temp, out id);
                if (!idIsInt) {
                    msgValue = ProductMsg.IdIsNotInt;
                    Response.Write((int)msgValue);
                    Response.End();
                }
                productId.Add(id);
            }

            DataTable ids = new DataTable();
            ids.Columns.Add(new DataColumn("ID", typeof(int)));

            for (int i = 0; i < productId.Count; i++)
            {
                ids.Rows.Add(productId[i]);
            }

            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_getSearchProductForCart", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                SqlParameter listParam = cmd.Parameters.AddWithValue("@list", ids);
                listParam.Direction = ParameterDirection.Input;
                SqlDataReader reader = cmd.ExecuteReader();
                InfoForCart infoForCart = new InfoForCart();
                List<ProductForCart> productArray = new List<ProductForCart>();
                //if(userInfo != null)
                //{
                //    infoForCart.MemberPoints = userInfo.Points;
                //}

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        ProductForCart productForCart = new ProductForCart()
                        {
                            ProductId = Convert.ToInt32(reader["f_id"]),
                            ProductTitle = reader["f_title"].ToString(),
                            ProductUnitPrice = Convert.ToInt32(reader["f_unitprice"]),
                            ProductQtn = Convert.ToInt32(reader["f_quantity"])
                        };
                        productArray.Add(productForCart);
                    }
                    infoForCart.ProductInfoList = productArray;
                    Response.Write(JsonConvert.SerializeObject(infoForCart));
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

        /// <summary>
        /// 新增訂單
        /// </summary>
        private void AddOrder()
        {
            string idNo = Request.Form["getMemberIdNo"];
            string orderItem = Request.Form["getItemArray"];
            JArray itemArray = JArray.Parse(orderItem);
            ProductMsg msgValue = ProductMsg.WrongConnection;
            string tempIdString = "";
            string tempQtnString = "";
            string tempPriceString = "";
            int tempProductId;
            int tempQtnForBuy;
            int tempUnitPrice;
            int subTotal = 0, total = 0;
            bool productIdIsInt, qtnIsInt, priceIsInt;

            if (string.IsNullOrEmpty(idNo) || idNo.Length > 10)
            {
                msgValue = ProductMsg.IdNoStringIsNullOrTooLong;
                Response.Write((int)msgValue);
                Response.End();
            }
            ///將從前端收到的資料建立成表單
            DataTable items = new DataTable();
            items.Columns.Add(new DataColumn("ProductId", typeof(int)));
            items.Columns.Add(new DataColumn("QtnForBuy", typeof(int)));
            items.Columns.Add(new DataColumn("UnitPrice", typeof(int)));

            ///驗証前端資料是否為正確格式
            foreach (JObject singleItem in itemArray.Children<JObject>())
            {
                DataRow itemRow = items.NewRow();
                tempIdString = singleItem.GetValue("ProductId").ToString();
                tempQtnString = singleItem.GetValue("QtnForBuy").ToString();
                tempPriceString = singleItem.GetValue("UnitPrice").ToString();

                productIdIsInt = int.TryParse(tempIdString, out tempProductId);
                qtnIsInt = int.TryParse(tempQtnString, out tempQtnForBuy);
                priceIsInt = int.TryParse(tempPriceString, out tempUnitPrice);
             
                if (!productIdIsInt)
                {
                    msgValue = ProductMsg.IdIsNotInt;
                    Response.Write((int)msgValue);
                    Response.End();
                }
                else if (!qtnIsInt)
                {
                    msgValue = ProductMsg.IdIsNotInt;
                    Response.Write((int)msgValue);
                    Response.End();
                }
                else if (!priceIsInt)
                {
                    msgValue = ProductMsg.PriceIsNotInt;
                    Response.Write((int)msgValue);
                    Response.End();
                }
                subTotal = tempQtnForBuy * tempUnitPrice;
                total += subTotal;
                itemRow["ProductId"] = tempProductId;
                itemRow["QtnForBuy"] = tempQtnForBuy;
                itemRow["UnitPrice"] = tempUnitPrice;
                items.Rows.Add(itemRow);
            }

            ///產生訂單代號
            Random rnd = new Random();
            string rn = rnd.Next(99 + 1).ToString().PadLeft(2, '0');
            string dtString = DateTime.Now.ToString("yyMMddHHmmss");
            string idNostring = idNo;

            if (idNostring.Length >= 6)
            {
                idNostring = idNostring.Substring(idNostring.Length - 6, 6);
            }
            else
            {
                idNostring = idNostring.PadLeft(6, '0');
            }

            string orderNumber = dtString + idNostring + rn;
            string strConnString = WebConfigurationManager.ConnectionStrings["shoppingBG"].ConnectionString;
            SqlConnection conn = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand("pro_shoppingFG_addAnOrder ", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();

            try
            {
                cmd.Parameters.Add(new SqlParameter("@MemberIdNo", idNo));
                cmd.Parameters.Add(new SqlParameter("@totalPrice", total));
                cmd.Parameters.Add(new SqlParameter("@orderNo", orderNumber));
                SqlParameter listParam = cmd.Parameters.AddWithValue("@item", items);
                listParam.Direction = ParameterDirection.Input;
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                DataTable dt = new DataTable();
                JArray dataToFrontArray = new JArray();
                for (int i = 0; i < ds.Tables.Count; i++)
                {
                    dt = ds.Tables[i];
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        DataRow row = dt.Rows[j];
                        if (dt.Columns.Count == 1)
                        {
                            JObject dataToFront = new JObject();
                            dataToFront.Add("messageNo", Convert.ToInt16(row.ItemArray[0]));
                            dataToFrontArray.Add(dataToFront);
                            break;
                        } else if(dt.Columns.Count == 5)
                        {
                            JObject dataToFront = new JObject();
                            dataToFront.Add("messageNo", Convert.ToInt16(row.ItemArray[0]));
                            dataToFront.Add("productId", Convert.ToInt32(row.ItemArray[1]));
                            dataToFront.Add("productTitle", row.ItemArray[2].ToString());
                            dataToFront.Add("unitPrice", Convert.ToInt32(row.ItemArray[3]));
                            dataToFront.Add("productQtn", Convert.ToInt32(row.ItemArray[4]));
                            dataToFrontArray.Add(dataToFront);
                           
                        }
                        else if (dt.Columns.Count == 2)
                        {
                            JObject dataToFront = new JObject();
                            dataToFront.Add("messageNo", Convert.ToInt16(row.ItemArray[0]));
                            dataToFront.Add("points", Convert.ToInt32(row.ItemArray[1]));
                            dataToFrontArray.Add(dataToFront);                           
                        }
                    }

                }
                Response.Write(dataToFrontArray);
              
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