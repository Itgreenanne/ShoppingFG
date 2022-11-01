USE ShoppingBG
GO
--ALTER PROCEDURE beginningSP @id NVARCHAR(20), @pwd NVARCHAR(20), @idOut NVARCHAR(20) OUTPUT, @nicknameOut NVARCHAR(20) OUTPUT,
--@pwdOut NVARCHAR(20) OUTPUT, @typeIdOut INT OUTPUT
ALTER PROCEDURE beginningSP 
AS
BEGIN

SELECT f_account, f_pwd FROM t_backendUser


---insert into t_backendUser(f_account, f_nickname, f_pwd, f_typeId)
--values(@id,'aaaa','5555',3)

END