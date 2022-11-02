USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingFG_getOrderByMemberId @memberId INT
AS 
BEGIN

SELECT f_id, f_orderNumber, f_totalPrice, f_createTime FROM t_order WHERE f_clientId = @memberId 

SELECT TA.f_id, TB.f_id, TA.f_productId, TA.f_productTitle, TA.f_number, TA.f_unitPrice 
FROM t_orderItem AS TA WITH(NOLOCK) left join t_order AS TB ON TA.f_orderId = TB.f_id WHERE TB.f_clientId = @memberId 

END  