USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyProduct @userId INT, @productId INT, @productPicPath NVARCHAR(100), @productTitle NVARCHAR(100), @unitPrice INT, @qtn INT, @productTypeId INT, @detail NVARCHAR(3000)
AS
BEGIN

--將修改前資料儲存到before變數
DECLARE @before NVARCHAR(4000)
SET @before = (SELECT TA.f_picturePath AS productPic, TA.f_title AS productTitle , TA.f_unitprice AS productUnitPrice, TA.f_quantity AS productQtn, TB.f_name AS productTypeName, TA.f_detail AS productDetail FROM t_product AS TA 
LEFT JOIN t_productType AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @productId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

UPDATE t_product WITH(ROWLOCK)
SET f_picturePath=@productPicPath, f_title=@productTitle ,f_unitprice= @unitPrice, f_quantity=@qtn, f_typeId=@productTypeId, f_detail=@detail, f_updateTime = GETDATE()
WHERE f_id=@productId

--將修改後資料儲存到after變數
DECLARE @after NVARCHAR(4000)
SET @after = (SELECT TA.f_picturePath AS productPic, TA.f_title AS productTitle , TA.f_unitprice AS productUnitPrice, TA.f_quantity AS productQtn, TB.f_name AS productTypeName, TA.f_detail AS productDetail FROM t_product AS TA 
LEFT JOIN t_productType AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @productId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

--新增職責修改前後資料到操作紀錄表格
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 3, 3, @before, @after)

SELECT 1 AS result

END