USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_getOperationRecordByFunction @functionType TINYINT
AS 
BEGIN

	SELECT TA.f_type, TA.f_function, TA.f_before, TA.f_after, TA.f_createTime, TB.f_account
	FROM t_operationRecord AS TA LEFT JOIN t_backendUser AS TB WITH(NOLOCK) ON TA.f_userId = TB.f_id  
	WHERE TA.f_function = @functionType ORDER BY TA.f_updateTime DESC

END