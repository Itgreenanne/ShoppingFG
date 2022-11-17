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

DECLARE @error INT = 0

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵�����ُ�I�������؂�����result=1
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
BEGIN

SET @error = 1
SELECT 1 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С��ُ�I�������؂�����result=2
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
BEGIN

SET @error = 1
SELECT 2 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С�ُ�I�������؂�����result=3
 IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
BEGIN

SET @error = 1
SELECT 3 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--������T�c��-���r��ؓ����Ԓ���Ͳ�������ӆ�Σ��؂�����result=4
IF EXISTS (SELECT f_id from t_frontendUser WHERE f_idNumber = @memberIdNo AND f_points - @totalPrice < 0 )
BEGIN

SELECT 4 AS result, f_points from t_frontendUser WHERE f_idNumber = @memberIdNo

END 

--ֻ������orderItem���΃r��DB��ͬ�Ҏ�攵��>ُ�I�������؂�result=5
IF @error != 1
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
SELECT IDENT_CURRENT ('t_order'), TA.f_id, TA.f_title, TT.QtnForBuy, TT.UnitPrice FROM t_product AS TA RIGHT JOIN @item AS TT ON TA.f_id = TT.ProductId
--�؂�����5�Լ�ӆ�ξ�̖���aƷid���aƷُ�I�������aƷ�΃r����ˌ������I�e
SELECT 5 AS result,TA.f_orderNumber, TB.f_productId, TB.f_number, TB.f_unitPrice FROM t_order AS TA RIGHT JOIN t_orderItem AS TB ON TA.f_id=TB.f_orderId
WHERE TA.f_id = IDENT_CURRENT ('t_order')

END

END
