USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyUser @currentUserId INT, @userId INT, @userNickname NVARCHAR(20), @userPwd NVARCHAR(20), @dutyTypeId INT
AS
BEGIN

--將修改前資料儲存到before變數
DECLARE @before NVARCHAR(4000)
SET @before = (SELECT TA.f_account AS userAccount, TA.f_nickname AS userNickname, TA.f_pwd AS userPwd, TB.f_name AS dutyName FROM t_backendUser AS TA 
LEFT JOIN t_duty AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @userId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

UPDATE t_backendUser WITH(ROWLOCK)
SET f_nickname=@userNickname, f_pwd=@userPwd, f_typeId=@dutyTypeId, f_updateTime = GETDATE()
WHERE f_id=@userId

--將修改後資料儲存到after變數
DECLARE @after NVARCHAR(4000)
SET @after = (SELECT TA.f_account AS userAccount, TA.f_nickname AS userNickname, TA.f_pwd AS userPwd, TB.f_name AS dutyName FROM t_backendUser AS TA 
LEFT JOIN t_duty AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @userId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

--新增職責修改前後資料到操作紀錄表格
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@currentUserId, 2, 3, @before, @after)

SELECT 1 AS result

END