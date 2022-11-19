alter TRIGGER dutyTrigger on t_duty
AFTER insert
AS   
    if (Select Count(*) From inserted) > 0 and (Select Count(*) From deleted) = 0
    begin
	INSERT INTO t_operationRecord(f_dataId,f_type,f_function,f_before, f_after )
	VALUES (IDENT_CURRENT ('t_duty'), 1, 1,null,null) ; 
    end

	if (Select Count(*) From inserted) > 0 and (Select Count(*) From deleted) > 0
    begin
	select *  FROM INSERTED
	select * from deleted
	INSERT INTO t_operationRecord(f_dataId,f_type,f_function,f_before, f_after)

    end
    
GO
