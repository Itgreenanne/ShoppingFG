exec pro_shoppingBG_modifyDuty @dutyId=3, @dutyName='nnn', @mangDuty =1, @mangUser=1, 
@mangProType=1, @mangProduct=0, @mangOrder=1, @mangRecord=1, @before='try before', @after='try after'
select * from t_duty order by f_updateTime desc
select * from t_operationRecord order by f_updateTime desc

--exec pro_shoppingBG_delDuty @dutyId=4
--select * from t_duty order by f_updateTime desc
--select * from t_operationRecord order by f_updateTime desc