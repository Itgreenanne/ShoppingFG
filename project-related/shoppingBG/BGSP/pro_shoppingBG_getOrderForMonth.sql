USE ShoppingBG
GO

ALTER PROCEDURE pro_shoppingBG_getOrderForMonth @startDate DATETIME,  @endDate DATETIME
AS 
BEGIN

SELECT SUM(f_totalPrice) AS sumTotalPrice, SUM(f_discount) AS sumDiscount , SUM(f_payment) AS sumPayment,  CONVERT (CHAR(10), f_createTime, 20) AS rangeTime, COUNT(f_orderNumber) AS orderQtn 
FROM t_order WHERE f_createTime >= @startDate AND f_createTime <= @endDate+1
GROUP BY CONVERT (CHAR(10), f_createTime, 20) ORDER BY rangeTime DESC

END  