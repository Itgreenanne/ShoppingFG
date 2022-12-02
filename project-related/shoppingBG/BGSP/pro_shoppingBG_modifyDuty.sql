USE ShoppingBG
GO
ALTER PROCEDURE pro_shoppingBG_modifyDuty @userId INT, @dutyId INT, @dutyName NVARCHAR(20), @mangDuty BIT, @mangUser BIT,
@mangProType BIT, @mangProduct BIT, @mangMember BIT, @mangOrder BIT, @mangRecord BIT
AS
BEGIN

IF NOT EXISTS (SELECT f_name FROM t_duty WHERE f_name = @dutyName AND f_id!=@dutyId)
BEGIN
--將修改前資料儲存到before變數
DECLARE @before NVARCHAR(4000)
SET @before = (SELECT f_name AS dutyName, f_manageDuty AS mangDuty, f_manageUser AS mangUser, f_manageProductType AS mangProType, 
f_manageProduct AS mangProduct, f_manageMember AS mangMember, f_manageOrder AS mangOrder, f_manageRecord AS mangRecord FROM t_duty WHERE f_id= @dutyId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

UPDATE t_duty WITH(ROWLOCK)
SET f_name=@dutyName, f_manageDuty=@mangDuty, f_manageUser=@mangUser, f_manageProductType=@mangProType, 
f_manageProduct=@mangProduct, f_manageMember=@mangMember, f_manageOrder=@mangOrder, f_manageRecord=@mangRecord, f_updateTime = GETDATE()
WHERE f_id=@dutyId

--將修改後資料儲存到after變數
DECLARE @after NVARCHAR(4000)
SET @after = (SELECT f_name AS dutyName, f_manageDuty AS mangDuty, f_manageUser AS mangUser, f_manageProductType AS mangProType, 
f_manageProduct AS mangProduct, f_manageMember AS mangMember, f_manageOrder AS mangOrder, f_manageRecord AS mangRecord FROM t_duty WHERE f_id= @dutyId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

--新增職責修改前後資料到操作紀錄表格
INSERT INTO t_operationRecord(f_userId, f_type, f_function, f_before, f_after )
VALUES(@userId, 1, 3, @before, @after)

SELECT 1 AS result

END

ELSE 
BEGIN

SELECT 0 AS result

END

END