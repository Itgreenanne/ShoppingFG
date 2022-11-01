--SELECT 1 FROM t_duty

USE ShoppingBG

go
declare @result as int
exec  dbo.addDutySP  @dutyName='jjggfgjk' , @mangDuty=1, @mangUser=1, @mangProType=1, @mangProduct=1, @mangOrder=1, @mangRecord=1 

