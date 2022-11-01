USE ShoppingBG
GO
CREATE PROCEDURE pro_shoppingFG_getOrderByMemberId @memberId INT
AS 
BEGIN

SELECT f_id, f_orderNumber, f_createTime FROM t_order

SELECT TA.f_id, TA.f_productId, TA.f_productTitle, TA.f_number, TA.f_unitPrice, TB.f_id
FROM t_orderItem AS TA left join t_order AS TB WITH(NOLOCK) ON TA.f_orderId = TB.f_id WHERE TA.f_id = @memberId

END  