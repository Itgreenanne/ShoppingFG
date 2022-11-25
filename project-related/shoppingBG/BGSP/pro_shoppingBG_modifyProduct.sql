USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyProduct @userId INT, @productId INT, @productPicPath NVARCHAR(100), @productTitle NVARCHAR(100), @unitPrice INT, @qtn INT, @productTypeId INT, @detail NVARCHAR(3000),
@before NVARCHAR(4000), @after NVARCHAR(4000)
AS
BEGIN

UPDATE t_product WITH(ROWLOCK)
SET f_picturePath=@productPicPath, f_title=@productTitle ,f_unitprice= @unitPrice, f_quantity=@qtn, f_typeId=@productTypeId, f_detail=@detail, f_updateTime = GETDATE()
WHERE f_id=@productId
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 3, 3, @before, @after)
SELECT 1 AS result

END