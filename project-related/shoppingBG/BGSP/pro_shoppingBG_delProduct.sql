USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delProduct @userId INT, @productId INT
AS 
BEGIN

	INSERT INTO t_operationRecord(f_userId, f_dataId, f_type, f_function, f_before, f_after )
	VALUES(@userId, @productId, 3, 2,'', (SELECT CONCAT('„h³ý', f_title) FROM t_product WHERE f_id=@productId ))

	DELETE FROM t_product WHERE f_id=@productId

	SELECT TA.f_id, TA.f_picturePath, TA.f_title, TA.f_unitprice, TA.f_quantity, TA.f_typeId, TA.f_detail, TB.f_name
	FROM t_product AS TA left join t_productType AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id


END