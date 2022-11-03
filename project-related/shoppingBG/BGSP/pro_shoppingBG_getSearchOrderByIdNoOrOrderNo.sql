USE ShoppingBG
GO
alter PROCEDURE pro_shoppingBG_getSearchOrderByIdNoOrOrderNo @input CHAR(20)
AS 
BEGIN

SELECT f_id, f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address, f_createTime
FROM t_order WITH(ROWLOCK) WHERE f_idNumber = @input OR f_orderNumber = @input

END