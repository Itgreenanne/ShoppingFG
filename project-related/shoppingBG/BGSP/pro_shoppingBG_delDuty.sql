USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delDuty @userId INT, @dutyId INT
AS 
BEGIN

--此職責有人員使用 傳1 不能刪除
IF EXISTS (SELECT f_account FROM t_backendUser WHERE f_typeId = @dutyId)
BEGIN

	SELECT 1 AS RESULT

END

--此職責無人員使用 可刪除
ELSE
BEGIN

	INSERT INTO t_operationRecord(f_userId, f_dataId, f_type, f_function, f_before, f_after )
	VALUES(@userId, @dutyId, 1, 2,'', (SELECT CONCAT('刪除', f_name) FROM t_duty WHERE f_id=@dutyId ))
	DELETE FROM t_duty WHERE f_id=@dutyId
	SELECT 0 AS result, f_id, f_name, f_manageDuty, f_manageUser, f_manageProductType,
		f_manageProduct, f_manageOrder, f_manageRecord
	FROM t_duty WITH(NOLOCK)
	
END

END