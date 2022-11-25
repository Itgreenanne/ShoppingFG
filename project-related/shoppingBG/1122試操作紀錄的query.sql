--exec pro_shoppingBG_modifyDuty @dutyId=2, @dutyName='ooo', @mangDuty =1, @mangUser=1, 
--@mangProType=0, @mangProduct=1, @mangOrder=1, @mangRecord=1
--select * from t_duty order by f_updateTime desc

exec pro_shoppingBG_delDuty @userId=1, @dutyId=9
select * from t_duty order by f_updateTime desc
select * from t_operationRecord order by f_updateTime desc

--exec pro_shoppingBG_addDuty @dutyName='3565', @mangDuty =1, @mangUser=0, 
--@mangProType=1, @mangProduct=0, @mangOrder=1, @mangRecord=1
--select * from t_duty order by f_updateTime desc

--EXEC pro_shoppingBG_modifyUser @userId=2, @userNickname='loveblue', @userPwd='123', @dutyTypeId=7
--select * from t_backendUser order by f_updateTime desc
--select * from t_operationRecord order by f_updateTime desc

--delete from t_operationRecord where f_id=144

--EXEC pro_shoppingBG_delUser @userId=3
--select * from t_backendUser order by f_updateTime desc
--select * from t_operationRecord order by f_updateTime desc