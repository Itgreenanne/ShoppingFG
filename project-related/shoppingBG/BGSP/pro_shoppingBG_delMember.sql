USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delMember @userId INT, @memberId INT
AS 
BEGIN

INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 4, 2,'', (SELECT f_idNumber AS idNo, f_firstname AS firstName, f_lastname AS lastName, f_gender AS gender, 
f_birthday AS birth, f_pwd AS pwd, f_mail AS mail, f_phone AS tel, f_address AS address, f_points AS points, f_level AS level
FROM t_frontendUser WHERE f_id=@memberId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))

DELETE FROM t_frontendUser WHERE f_id=@memberId

SELECT f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_pwd, f_mail, f_phone, f_address, f_points, f_level
FROM t_frontendUser WITH(ROWLOCK)

END