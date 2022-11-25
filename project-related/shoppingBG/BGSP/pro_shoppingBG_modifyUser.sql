USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyUser @currentUserId INT, @userId INT, @userNickname NVARCHAR(20), @userPwd NVARCHAR(20), @dutyTypeId INT, 
@before NVARCHAR(4000), @after NVARCHAR(4000)
AS
BEGIN

UPDATE t_backendUser WITH(ROWLOCK)
SET f_nickname=@userNickname, f_pwd=@userPwd, f_typeId=@dutyTypeId, f_updateTime = GETDATE()
WHERE f_id=@userId
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@currentUserId, 2, 3, @before, @after)
SELECT 1 AS result

END