USE ShoppingBG
GO
CREATE PROCEDURE pro_shoppingBG_getSearchProduct @productTitle NVARCHAR(100), @proTypeId INT
AS 
BEGIN
--���}�c؟ID���߶�ƥ��
IF (@productTitle != '' AND @proTypeId != 0)
BEGIN

SELECT TA.f_id, TA.f_picturePath, TA.f_title, TA.f_unitprice, TA.f_quantity, TA.f_typeId, TA.f_detail, TB.f_name
FROM t_product AS TA left join t_productType AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE TA.f_title LIKE '%'+@productTitle+'%' collate Latin1_General_CS_AS
AND TA.f_typeId = @proTypeId

END

--�aƷ�N]ݔ��ֻ�Ø��}ƥ��
--ELSE IF EXISTS (SELECT f_account FROM t_backendUser WHERE f_account = @userAccount)
ELSE IF (@proTypeId = 0)
BEGIN

SELECT TA.f_id, TA.f_picturePath, TA.f_title, TA.f_unitprice, TA.f_quantity, TA.f_typeId, TA.f_detail, TB.f_name
FROM t_product AS TA left join t_productType AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE TA.f_title LIKE '%'+@productTitle+'%' collate Latin1_General_CS_AS

END

--ֻ�îaƷeƥ��
ELSE IF (@productTitle = '')
BEGIN

SELECT TA.f_id, TA.f_picturePath, TA.f_title, TA.f_unitprice, TA.f_quantity, TA.f_typeId, TA.f_detail, TB.f_name
FROM t_product AS TA left join t_productType AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE TB.f_id = @proTypeId

END

END