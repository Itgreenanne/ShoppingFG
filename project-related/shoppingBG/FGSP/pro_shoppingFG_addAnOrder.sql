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

--購買的產品單價與DB的產品單價不同且庫存數量大於購買數量，回傳參數result=1
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
BEGIN

SET @error = 1
SELECT 1 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

END

--購買的產品單價與DB的產品單價相同且庫存數量小於於購買數量，回傳參數result=2
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
BEGIN

SET @error = 1
SELECT 2 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--購買的產品單價與DB的產品單價不同且庫存數量小於購買數量，回傳參數result=3
 IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
BEGIN

SET @error = 1
SELECT 3 AS result, f_id, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--如果會員點數-總價是負數的話，就不會建立訂單，回傳參數result=4
IF EXISTS (SELECT f_id from t_frontendUser WHERE f_idNumber = @memberIdNo AND f_points - @totalPrice < 0 )
BEGIN

SELECT 4 AS result, f_points from t_frontendUser WHERE f_idNumber = @memberIdNo

END 

--只有所有orderItem都單價跟DB相同且庫存數量>購買數量，回傳result=5
IF @error != 1
BEGIN

--更新會員點數
UPDATE t_frontendUser WITH(ROWLOCK)
SET f_points = f_points - @totalPrice, f_updateTime = GETDATE() WHERE f_idNumber = @memberIdNo
--將資料寫到訂單表格
INSERT INTO t_order (f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address)
SELECT @orderNo, @totalPrice, 0, @totalPrice, f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address FROM t_frontendUser WHERE f_idNumber = @memberIdNo
--更新產品表格中的庫存數量
UPDATE t_product WITH(ROWLOCK)
SET f_quantity = f_quantity - QtnForBuy, f_updateTime = GETDATE() FROM @item WHERE f_id = ProductId
--將資料寫到訂單細項表格
INSERT INTO t_orderItem(f_orderId, f_productId, f_productTitle, f_number, f_unitPrice)
SELECT IDENT_CURRENT ('t_order'), TA.f_id, TA.f_title, TT.QtnForBuy, TT.UnitPrice FROM t_product AS TA RIGHT JOIN @item AS TT ON TA.f_id = TT.ProductId
--回傳參數5以及訂單編號、產品id、產品購買數量、產品單價到後端寫到日誌裡
SELECT 5 AS result,TA.f_orderNumber, TB.f_productId, TB.f_number, TB.f_unitPrice FROM t_order AS TA RIGHT JOIN t_orderItem AS TB ON TA.f_id=TB.f_orderId
WHERE TA.f_id = IDENT_CURRENT ('t_order')

END

END
