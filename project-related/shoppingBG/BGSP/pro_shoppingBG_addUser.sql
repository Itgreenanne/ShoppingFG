USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_addUser @userId INT, @userAccount NVARCHAR(20), @nickName NVARCHAR(20), @userPwd NVARCHAR(20), @dutyTypeId INT
AS
BEGIN

IF NOT EXISTS (SELECT f_account FROM t_backendUser WHERE f_account = @userAccount)
BEGIN

INSERT INTO t_backendUser(f_account,f_nickname,f_pwd,f_typeId)
VALUES(@userAccount, @nickName, @userPwd, @dutyTypeId)
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 2, 1,'', (SELECT TA.f_account AS userAccount, TA.f_nickname AS userNickname, TA.f_pwd AS userPwd, TB.f_name AS dutyName 
FROM t_backendUser AS TA LEFT JOIN t_duty AS TB ON TA.f_typeId = TB.f_id WHERE TA.f_id= @@IDENTITY FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))
SELECT 1 AS result 

END

ELSE 
BEGIN

SELECT 0 AS result 

END

END