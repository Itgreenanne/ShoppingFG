USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyMember @userId INT, @id INT, @tel CHAR(10), @pwd NVARCHAR(20), @gender TINYINT, @lastName NVARCHAR(20),  @firstName NVARCHAR(20), @birth CHAR(10),
@mail VARCHAR(40), @address NVARCHAR(200), @level TINYINT, @points BIGINT, @before NVARCHAR(4000), @after NVARCHAR(4000)
AS
BEGIN



UPDATE t_frontendUser WITH(ROWLOCK)
SET f_firstname = @firstName, f_lastname = @lastName, f_gender = @gender, f_birthday = @birth, f_pwd = @pwd, f_mail = @mail, 
f_phone = @tel, f_address = @address, f_points = @points, f_level = @level, f_updateTime = GETDATE()
WHERE f_id=@id
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 4, 3, @before, @after)
SELECT 1 AS result

END