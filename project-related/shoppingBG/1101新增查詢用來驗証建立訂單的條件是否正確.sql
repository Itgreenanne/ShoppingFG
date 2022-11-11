declare @item productOrdered
declare @memberIdNo char(10) = 'N123456789'
declare @totalPrice int = '100'
insert into @item
values(2, 1100,100),(3,200,100)
--VALUES(3,3,100)

DECLARE @ERROR INT =0

--購買的產品單價與DB的產品單價不同且庫存數量大於購買數量，回傳參數result='10'
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
BEGIN

SET @ERROR = 1
SELECT '10' AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

END

--購買的產品單價與DB的產品單價相同且庫存數量小於於購買數量，回傳參數result='01'
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
BEGIN


SET @ERROR = 1
SELECT '01' AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--購買的產品單價與DB的產品單價不同且庫存數量小於購買數量，回傳參數result='11'
 IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
BEGIN

SET @ERROR = 1
SELECT '11' AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

 IF @ERROR != 1
	BEGIN
	SELECT '00' AS result
eND




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


