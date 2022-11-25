USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_delMember @userId INT, @memberId INT
AS 
BEGIN

INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 4, 2,'', (SELECT CONCAT('„h³ý', f_title) FROM t_product WHERE f_id=@memberId ))

DELETE FROM t_frontendUser WHERE f_id=@memberId

SELECT f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_pwd, f_mail, f_phone, f_address, f_points, f_level
FROM t_frontendUser WITH(ROWLOCK)

END