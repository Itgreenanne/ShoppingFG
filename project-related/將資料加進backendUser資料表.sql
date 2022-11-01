/****** SSMS 中 SelectTopNRows 命令的指令碼  ******/

insert into t_backendUser(f_account, f_nickname, f_pwd, f_typeId)
values('love','aaa','4321',1)

--DELETE  FROM t_backendUser

--UPDATE t_backendUser SET f_typeId='1' WHERE f_account='abce';



SELECT TOP (1000) [f_id]
      ,[f_account]
      ,[f_nickname]
      ,[f_pwd]
      ,[f_typeId]
      ,[f_createTime]
      ,[f_updateTime]
  FROM [ShoppingBG].[dbo].[t_backendUser]

