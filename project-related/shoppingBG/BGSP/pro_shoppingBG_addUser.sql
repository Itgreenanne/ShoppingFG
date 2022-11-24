USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_addUser @userId INT, @userAccount NVARCHAR(20), @nickName NVARCHAR(20), @userPwd NVARCHAR(20), @dutyTypeId INT
AS
BEGIN

IF NOT EXISTS (SELECT f_account FROM t_backendUser WHERE f_account = @userAccount)
BEGIN

INSERT INTO t_backendUser(f_account,f_nickname,f_pwd,f_typeId)
VALUES(@userAccount, @nickName, @userPwd, @dutyTypeId)
INSERT INTO t_operationRecord(f_userId, f_dataId, f_type, f_function, f_before, f_after )
VALUES(@userId, IDENT_CURRENT ('t_backendUser'), 2, 1,'', CONCAT('ÐÂÔö', @userAccount))
SELECT 1 AS result 

END

ELSE 
BEGIN

SELECT 0 AS result 

END

END