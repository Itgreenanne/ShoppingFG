USE ShoppingBG
GO
CREATE PROCEDURE pro_shoppingBG_getAllOperationRecord 
AS 
BEGIN

	SELECT f_id, f_dataId, f_type, f_function, f_before, f_after, f_createTime
	FROM t_operationRecord WITH(NOLOCK)

END