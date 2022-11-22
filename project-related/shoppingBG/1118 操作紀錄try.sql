
--create type jsontemp as table(
--jsoncolumn nvarchar(4000)
--)
--go


alter TRIGGER dutyTrigger on t_duty 
AFTER insert, update, delete
AS   
    if (Select Count(*) From inserted) > 0 and (Select Count(*) From deleted) = 0
    begin
	INSERT INTO t_operationRecord(f_dataId,f_type,f_function,f_before, f_after )
	VALUES (IDENT_CURRENT ('t_duty'), 1, 1,null,null) ; 
    end

	if (Select Count(*) From inserted) > 0 and (Select Count(*) From deleted) > 0
    begin
	
	--use concat
	insert into t_operationRecord(f_dataId, f_type, f_function, f_before, f_after)
	select (select f_id from deleted), 1, 3, (select CONCAT ('職責名稱:', f_name, ' | 職者管理:', f_manageDuty, ' | 使用者管理:', f_manageUser, ' | 產品類別管理:', f_manageProductType, ' | 產品管理:', f_manageProduct, ' | 訂單管理:', f_manageOrder, ' | 操作紀錄管理:', f_manageRecord) from deleted), 
	(select CONCAT ('職責名稱:', f_name, ' | 職者管理:', f_manageDuty, ' | 使用者管理:', f_manageUser, ' | 產品類別管理:', f_manageProductType, ' | 產品管理:', f_manageProduct, ' | 訂單管理:', f_manageOrder, ' | 操作紀錄管理:', f_manageRecord) from inserted)

	--use json auto
	--insert into t_operationRecord(f_dataId, f_type, f_function, f_before, f_after)
	--select (select f_id from deleted), 1, 3, (select f_name as name, f_manageDuty as manD, f_manageUser as manU, f_manageProductType as manPT, f_manageProduct as manP, f_manageOrder as manO, f_manageRecord as manR from deleted for json auto), (select f_name as name, f_manageDuty as manD, f_manageUser as manU, f_manageProductType as manPT, f_manageProduct as manP, f_manageOrder as manO, f_manageRecord as manR from inserted for json auto)

	--insert into t_operationRecord(f_dataId, f_type, f_function, f_before, f_after)
	--select (select f_id from deleted), 1, 3, (select * from deleted t1 full join inserted t2 on t1.f_id = t2.f_id where t1.f_manageDuty <> t2.f_manageDuty or t1.f_manageUser <> t2.f_manageUser), (select * from deleted t1 full join inserted t2 on t1.f_id = t2.f_id where t1.f_manageDuty <> t2.f_manageDuty or t1.f_manageUser <> t2.f_manageUser)


    end
    
GO
