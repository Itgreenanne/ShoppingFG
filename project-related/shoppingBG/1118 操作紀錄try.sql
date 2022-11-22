
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
	select (select f_id from deleted), 1, 3, (select CONCAT ('؟���Q:', f_name, ' | �߹���:', f_manageDuty, ' | ʹ���߹���:', f_manageUser, ' | �aƷe����:', f_manageProductType, ' | �aƷ����:', f_manageProduct, ' | ӆ�ι���:', f_manageOrder, ' | �����o䛹���:', f_manageRecord) from deleted), 
	(select CONCAT ('؟���Q:', f_name, ' | �߹���:', f_manageDuty, ' | ʹ���߹���:', f_manageUser, ' | �aƷe����:', f_manageProductType, ' | �aƷ����:', f_manageProduct, ' | ӆ�ι���:', f_manageOrder, ' | �����o䛹���:', f_manageRecord) from inserted)

	--use json auto
	--insert into t_operationRecord(f_dataId, f_type, f_function, f_before, f_after)
	--select (select f_id from deleted), 1, 3, (select f_name as name, f_manageDuty as manD, f_manageUser as manU, f_manageProductType as manPT, f_manageProduct as manP, f_manageOrder as manO, f_manageRecord as manR from deleted for json auto), (select f_name as name, f_manageDuty as manD, f_manageUser as manU, f_manageProductType as manPT, f_manageProduct as manP, f_manageOrder as manO, f_manageRecord as manR from inserted for json auto)

	--insert into t_operationRecord(f_dataId, f_type, f_function, f_before, f_after)
	--select (select f_id from deleted), 1, 3, (select * from deleted t1 full join inserted t2 on t1.f_id = t2.f_id where t1.f_manageDuty <> t2.f_manageDuty or t1.f_manageUser <> t2.f_manageUser), (select * from deleted t1 full join inserted t2 on t1.f_id = t2.f_id where t1.f_manageDuty <> t2.f_manageDuty or t1.f_manageUser <> t2.f_manageUser)


    end
    
GO
