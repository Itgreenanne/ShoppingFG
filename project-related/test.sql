insert into t_duty(f_name, f_canCreateUser, f_manageProduct, f_manageOrder, f_customerService)
values('anne',0,1,1,1)
select * from t_duty

--insert into t_backendUser (f_account, f_nickname, f_pwd, f_typeId)
--values('jkjlkjs','kjfkdjfk','adkjkj1', 232)
--select * from t_backendUser

--insert into t_backendUser (f_account, f_nickname, f_pwd, f_typeId)
--values('shhhjdf','gk','adghh1', 6565)
--select * from t_backendUser


insert into t_order(f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address)
values('adfd', 56565, 232, 65656, 45454, '6dfda','adfjk', 'adfdjkjl', 2, '19845663', 'dfsdkj@dkajfdkh.com', '06565454', 'dfkjkajdfklakdflkjkjkji234')
select f_id, f_orderNumber, f_totalPrice, f_discount, f_createTime, f_updateTime from t_order