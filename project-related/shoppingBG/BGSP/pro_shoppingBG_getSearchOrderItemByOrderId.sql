USE ShoppingBG
GO

CREATE PROCEDURE pro_shoppingBG_getSearchOrderItemByOrderId @orderId INT
AS 
BEGIN

SELECT f_id, f_orderId, f_productId, f_productTitle, f_number, f_unitPrice
FROM t_orderItem WITH(ROWLOCK) WHERE f_orderId = @orderId

END