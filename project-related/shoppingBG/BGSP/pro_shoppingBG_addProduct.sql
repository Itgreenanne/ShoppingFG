USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_addProduct @userId INT, @productPic NVARCHAR(100), @productTitle NVARCHAR(100), @unitPrice INT, @qtn INT, @productTypeId INT, @detail NVARCHAR(3000)
AS
BEGIN

INSERT INTO t_product(f_picturePath, f_title,f_unitprice, f_quantity, f_typeId, f_detail)
VALUES( @productPic, @productTitle, @unitPrice, @qtn , @productTypeId, @detail)
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 3, 1,'', CONCAT('ÐÂÔö', @productTitle))
SELECT 1 AS result

END