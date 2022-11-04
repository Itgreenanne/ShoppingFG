USE ShoppingBG
GO
alter PROCEDURE pro_shoppingBG_getOrderByDate @startDate DATETIME,  @endDate DATETIME
AS 
BEGIN

--SELECT f_id, f_orderNumber, f_totalPrice, f_discount, f_payment, f_createTime FROM t_order WHERE f_createTime BETWEEN @startDate - 1 AND @endDate + 1
SELECT f_id, f_orderNumber, f_totalPrice, f_discount, f_payment, f_createTime FROM t_order WHERE f_createTime >= @startDate AND f_createTime <= @endDate+1


END  