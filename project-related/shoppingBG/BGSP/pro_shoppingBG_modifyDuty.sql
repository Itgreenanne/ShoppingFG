USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyDuty @userId INT, @dutyId INT, @dutyName NVARCHAR(20), @mangDuty BIT, @mangUser BIT, 
@mangProType BIT, @mangProduct BIT, @mangOrder BIT, @mangRecord BIT, @before NVARCHAR(4000), @after NVARCHAR(4000)
AS
BEGIN

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName AND f_id!=@dutyId)
BEGIN

UPDATE t_duty WITH(ROWLOCK)
SET f_name=@dutyName, f_manageDuty=@mangDuty, f_manageUser=@mangUser, f_manageProductType=@mangProType, 
f_manageProduct=@mangProduct, f_manageOrder=@mangOrder, f_manageRecord=@mangRecord, f_updateTime = GETDATE()
WHERE f_id=@dutyId
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 1, 3, @before, @after)
SELECT 1 AS result

END

ELSE 
BEGIN

SELECT 0 AS result

END

END