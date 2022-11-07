USE ShoppingBG
GO
alter PROCEDURE pro_shoppingBG_getOrderForDay @range DATETIME
AS 
BEGIN

SELECT f_id, f_orderNumber, f_totalPrice, f_discount, f_payment, f_idNumber, f_createTime FROM t_order WHERE f_createTime >= @range AND f_createTime <= @range+1

END  