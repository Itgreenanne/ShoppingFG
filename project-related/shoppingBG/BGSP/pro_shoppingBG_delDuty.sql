USE ShoppingBG
GO
CREATE PROCEDURE pro_shoppingBG_delDuty @dutyId INT
AS 
BEGIN

--��؟���ˆTʹ�� ��1 ���܄h��
IF EXISTS (SELECT f_account FROM t_backendUser WHERE f_typeId = @dutyId)
BEGIN

	SELECT 1 AS RESULT

END

--��؟�o�ˆTʹ�� �Ʉh��
ELSE
BEGIN

	DELETE FROM t_duty WHERE f_id=@dutyId
	SELECT 0 AS RESULT, f_id, f_name, f_manageDuty, f_manageUser, f_manageProductType,
		f_manageProduct, f_manageOrder, f_manageRecord
	FROM t_duty WITH(NOLOCK)
END
END