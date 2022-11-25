USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_addDuty @userId INT, @dutyName NVARCHAR(20), @mangDuty bit, @mangUser bit, @mangProType bit, @mangProduct bit, @mangOrder bit, @mangRecord bit
AS
BEGIN

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName)
BEGIN

INSERT INTO t_duty(f_name,f_manageDuty,f_manageUser,f_manageProductType,f_manageProduct, f_manageOrder, f_manageRecord)
VALUES(@dutyName, @mangDuty, @mangUser, @mangProType, @mangProduct, @mangOrder, @mangRecord)
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 1, 1,'', CONCAT('dutyName: ', @dutyName, ', ؟����: ', @mangDuty, ', �ˆT����: ', @mangUser, ', �aƷe����: ', @mangProType,
', �aƷ����: ', @mangProduct, ', ӆ�ι���: ', @mangOrder, ', �����o䛹���: ', @mangRecord))

SELECT 1 AS result

END

ELSE 
BEGIN

SELECT 0 AS result 

END

END