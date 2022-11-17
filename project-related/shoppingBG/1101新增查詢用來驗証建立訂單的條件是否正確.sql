declare @item productOrdered
declare @orderNo char(20) = '20221107114200000001'
declare @memberIdNo char(10) = 'N123456789'
declare @totalPrice int = '100'
insert into @item
values(2, 2,100),(3,3,100)
--VALUES(3,3,100)

--將資料寫到訂單表格
INSERT INTO t_order (f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address)
SELECT @orderNo, @totalPrice, 0, @totalPrice, f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address FROM t_frontendUser WHERE f_idNumber = @memberIdNo
INSERT INTO t_orderItem(f_orderId, f_productId, f_productTitle, f_number, f_unitPrice)
SELECT IDENT_CURRENT ('t_order'), TA.f_id, TA.f_title, TT.QtnForBuy, TT.UnitPrice FROM t_product AS TA RIGHT JOIN @item AS TT ON TA.f_id = TT.ProductId
SELECT 5 AS result,TA.f_orderNumber, TB.f_productId, TB.f_number, TB.f_unitPrice FROM t_order AS TA RIGHT JOIN t_orderItem AS TB ON TA.f_id=TB.f_orderId
WHERE TA.f_id = IDENT_CURRENT ('t_order')





--IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
--BEGIN

--SELECT 0 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

--END

------只要購買的產品購買數量比庫存數量多，就不會建立訂單
--IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
--BEGIN

--SELECT 1 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

--END

----只要購買的產品購買數量比庫存數量多，以及產品單價改變，就不會建立訂單
-- IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
--BEGIN

--SELECT 2 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

--END


--IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_quantity >= TT.QtnForBuy AND f_unitprice = TT.UnitPrice))
--BEGIN

--SELECT 3 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_quantity >= TT.QtnForBuy AND f_unitprice = TT.UnitPrice
--END


