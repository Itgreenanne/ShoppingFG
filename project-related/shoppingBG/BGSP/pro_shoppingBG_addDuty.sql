USE ShoppingBG
GO
alter PROCEDURE pro_shoppingBG_addDuty @dutyName NVARCHAR(20), @mangDuty bit, @mangUser bit, @mangProType bit, @mangProduct bit, @mangOrder bit, @mangRecord bit
AS
BEGIN

DECLARE @result BIT 

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName)
BEGIN

INSERT INTO t_duty(f_name,f_manageDuty,f_manageUser,f_manageProductType,f_manageProduct, f_manageOrder, f_manageRecord)
VALUES(@dutyName, @mangDuty, @mangUser, @mangProType, @mangProduct, @mangOrder, @mangRecord)
INSERT INTO t_operationRecord(f_dataId, f_type, f_function, f_before, f_after )
VALUES(IDENT_CURRENT ('t_duty'), 1, 1,null, CONCAT('ÐÂÔö', @dutyName))

--select 1 as result 

END

ELSE 
BEGIN

SELECT @result=0

--select 0 as result 

END

END