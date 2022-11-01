USE ShoppingBG
GO
CREATE PROCEDURE pro_shoppingBG_getSearchUser @userAccount NVARCHAR(20), @dutyId INT
AS 
BEGIN
--��̖�c؟ID���߶�ƥ��
IF (@userAccount != '' AND @dutyId != 0)
BEGIN

SELECT TA.f_id, TA.f_account, TA.f_nickname, TA.f_pwd, TA.f_typeId, TB.f_name
FROM t_backendUser AS TA left join t_duty AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE f_account = @userAccount AND f_typeId = @dutyId

END

--؟ID�]ݔ��ֻ�Î�̖ƥ��
--ELSE IF EXISTS (SELECT f_account FROM t_backendUser WHERE f_account = @userAccount)
ELSE IF (@dutyId = 0)
BEGIN

SELECT TA.f_id, TA.f_account, TA.f_nickname, TA.f_pwd, TA.f_typeId, TB.f_name
FROM t_backendUser AS TA left join t_duty AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE f_account = @userAccount

END

--��̖�]ݔ��ֻ��؟idƥ��
ELSE IF (@userAccount = '')
BEGIN

SELECT TA.f_id, TA.f_account, TA.f_nickname, TA.f_pwd, TA.f_typeId, TB.f_name
FROM t_backendUser AS TA left join t_duty AS TB WITH(NOLOCK) ON TA.f_typeId = TB.f_id WHERE TB.f_id = @dutyId

END

END