USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_addDuty @userId INT, @dutyName NVARCHAR(20), @mangDuty bit, @mangUser bit, @mangProType bit, @mangProduct bit, @mangMember bit, @mangOrder bit, @mangRecord bit
AS
BEGIN

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName)
BEGIN

INSERT INTO t_duty(f_name,f_manageDuty,f_manageUser,f_manageProductType,f_manageProduct, f_manageMember, f_manageOrder, f_manageRecord)
VALUES(@dutyName, @mangDuty, @mangUser, @mangProType, @mangProduct, @mangMember, @mangOrder, @mangRecord)
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 1, 1,'', (SELECT f_name AS dutyName, f_manageDuty AS mangDuty, f_manageUser AS mangUser, f_manageProductType AS mangProType,
	f_manageProduct AS mangProduct, f_manageMember AS mangMember, f_manageOrder AS mangOrder, f_manageRecord AS mangRecord FROM t_duty WHERE f_id= @@IDENTITY FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))

SELECT 1 AS result

END

ELSE 
BEGIN

SELECT 0 AS result 

END

END