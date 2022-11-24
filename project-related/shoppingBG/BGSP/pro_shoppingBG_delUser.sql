USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delUser @currentUserId INT, @userId INT
AS 
BEGIN

	INSERT INTO t_operationRecord(f_userId, f_dataId, f_type, f_function, f_before, f_after )
	VALUES(@currentUserId, @userId, 2, 2,'', (SELECT CONCAT('„h³ý', f_account) FROM t_backendUser WHERE f_id=@userId ))

	DELETE FROM t_backendUser WHERE f_id=@userId

	SELECT TA.f_id, TA.f_account, TA.f_nickname, TA.f_pwd, TB.f_name
	FROM t_backendUser AS TA left join t_duty AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id

END