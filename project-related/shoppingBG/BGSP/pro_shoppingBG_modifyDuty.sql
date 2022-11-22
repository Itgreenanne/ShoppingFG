USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyDuty @dutyId INT, @dutyName NVARCHAR(20), @mangDuty BIT, @mangUser BIT, 
@mangProType BIT, @mangProduct BIT, @mangOrder BIT, @mangRecord BIT, @before NVARCHAR(4000), @after NVARCHAR(4000)
AS
BEGIN

DECLARE @result BIT 

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName AND f_id!=@dutyId)
BEGIN

UPDATE t_duty WITH(ROWLOCK)
SET f_name=@dutyName, f_manageDuty=@mangDuty, f_manageUser=@mangUser, f_manageProductType=@mangProType, 
f_manageProduct=@mangProduct, f_manageOrder=@mangOrder, f_manageRecord=@mangRecord, f_updateTime = GETDATE()
WHERE f_id=@dutyId
INSERT INTO t_operationRecord(f_dataId, f_type, f_function, f_before, f_after )
VALUES(@dutyId, 1, 3, @before, @after)
SELECT @result=1

END

ELSE 
BEGIN

SELECT @result=0

END

END