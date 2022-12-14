USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delProduct @userId INT, @productId INT
AS 
BEGIN

	INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
	VALUES(@userId, 3, 2, (SELECT TA.f_picturePath AS productPic, TA.f_title AS productTitle, TA.f_unitprice AS productUnitPrice, 
	TA.f_quantity AS productQtn, TA.f_detail AS productDetail, TB.f_name AS productTypeName 
	FROM t_product AS TA LEFT JOIN t_productType AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id = @productId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER), '')

	DELETE FROM t_product WHERE f_id=@productId

	SELECT TA.f_id, TA.f_picturePath, TA.f_title, TA.f_unitprice, TA.f_quantity, TA.f_typeId, TA.f_detail, TB.f_name
	FROM t_product AS TA left join t_productType AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id


END