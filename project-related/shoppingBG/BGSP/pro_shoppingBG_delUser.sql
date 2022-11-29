USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delUser @currentUserId INT, @userId INT
AS 
BEGIN

	INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
	VALUES(@currentUserId, 2, 2,'', (SELECT TA.f_account AS userAccount, TA.f_nickname AS userNickname, TA.f_pwd AS userPwd, TB.f_name AS dutyName 
	FROM t_backendUser AS TA LEFT JOIN t_duty AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @userId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))

	DELETE FROM t_backendUser WHERE f_id=@userId

	SELECT TA.f_id, TA.f_account, TA.f_nickname, TA.f_pwd, TB.f_name
	FROM t_backendUser AS TA left join t_duty AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id

END