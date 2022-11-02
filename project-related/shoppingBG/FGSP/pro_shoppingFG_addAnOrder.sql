USE ShoppingBG
GO

CREATE TYPE productOrdered AS TABLE(
   ProductId INT,
   QtnForBuy INT,
   UnitPrice INT
);
GO

ALTER PROCEDURE pro_shoppingFG_addAnOrder @memberIdNo CHAR(10), @totalPrice BIGINT, @orderNo CHAR(20), @item productOrdered READONLY
AS
BEGIN

--ֻҪُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ����ُ�I�����Ȏ�攵���࣬�Ͳ�������ӆ��
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice OR f_quantity < TT.QtnForBuy)) 
BEGIN

SELECT 0 AS result

END

--������T�c��-���r��ؓ����Ԓ���Ͳ�������ӆ��
ELSE IF EXISTS (SELECT f_id from t_frontendUser WHERE f_idNumber = @memberIdNo AND f_points - @totalPrice < 0 )
BEGIN

SELECT 0 AS result

END 

ELSE 
BEGIN

--�����T�c��
UPDATE t_frontendUser WITH(ROWLOCK)
SET f_points = f_points - @totalPrice, f_updateTime = GETDATE() WHERE f_idNumber = @memberIdNo

--���Y�ό���ӆ�α��
INSERT INTO t_order (f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address)
SELECT @orderNo, @totalPrice, 0, @totalPrice, f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address FROM t_frontendUser WHERE f_idNumber = @memberIdNo

--���®aƷ����еĎ�攵��
UPDATE t_product WITH(ROWLOCK)
SET f_quantity = f_quantity - QtnForBuy, f_updateTime = GETDATE() FROM @item WHERE f_id = ProductId

--���Y�ό���ӆ�μ�헱��
INSERT INTO t_orderItem(f_orderId, f_productId, f_productTitle, f_number, f_unitPrice)
SELECT @@IDENTITY, TA.f_id, TA.f_title, TT.QtnForBuy, TT.UnitPrice FROM t_product AS TA RIGHT JOIN @item AS TT ON TA.f_id = TT.ProductId

SELECT 1 AS result

END

END