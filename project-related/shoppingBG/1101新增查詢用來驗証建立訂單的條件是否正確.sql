declare @item productOrdered
declare @memberIdNo char(10) = 'N123456789'
declare @totalPrice int = '100'
insert into @item
values(2, 1100,100),(3,200,100)
--VALUES(3,3,100)

DECLARE @ERROR INT =0

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵�����ُ�I�������؂�����result='10'
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
BEGIN

SET @ERROR = 1
SELECT '10' AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С��ُ�I�������؂�����result='01'
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
BEGIN


SET @ERROR = 1
SELECT '01' AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С�ُ�I�������؂�����result='11'
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

------ֻҪُ�I�ĮaƷُ�I�����Ȏ�攵���࣬�Ͳ�������ӆ��
--IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
--BEGIN

--SELECT 1 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

--END

----ֻҪُ�I�ĮaƷُ�I�����Ȏ�攵���࣬�Լ��aƷ�΃r��׃���Ͳ�������ӆ��
-- IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
--BEGIN

--SELECT 2 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

--END


--IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_quantity >= TT.QtnForBuy AND f_unitprice = TT.UnitPrice))
--BEGIN

--SELECT 3 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_quantity >= TT.QtnForBuy AND f_unitprice = TT.UnitPrice
--END


