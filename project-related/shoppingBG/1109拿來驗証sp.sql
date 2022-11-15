declare @item productOrdered
declare @memberIdNo char(10) = 'N123456789'
declare @totalPrice int = '100'
insert into @item
values(1,99,50),(2,99,100),(4,1,100)


DECLARE @error INT = 0

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵�����ُ�I�������؂�����result=1
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy )) 
BEGIN

SET @error = 1
SELECT 1 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity >= TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С��ُ�I�������؂�����result=2
IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy)) 
BEGIN

SET @error = 1
SELECT 2 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice = TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--ُ�I�ĮaƷ�΃r�cDB�ĮaƷ�΃r��ͬ�Ҏ�攵��С�ُ�I�������؂�����result=3
 IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE  f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy))
BEGIN

SET @error = 1
SELECT 3 AS result, f_title, f_unitprice, f_quantity FROM t_product AS TA LEFT JOIN @item AS TT ON TA.f_id = TT.ProductId WHERE f_unitprice != TT.UnitPrice AND f_quantity < TT.QtnForBuy

END

--������T�c��-���r��ؓ����Ԓ���Ͳ�������ӆ�Σ��؂�����result=4
IF EXISTS (SELECT f_id from t_frontendUser WHERE f_idNumber = @memberIdNo AND f_points - @totalPrice < 0 )
BEGIN

SELECT 4 AS result, f_points from t_frontendUser WHERE f_idNumber = @memberIdNo

END 

--ֻ������orderItem���΃r��DB��ͬ�Ҏ�攵��>ُ�I�������؂�result=5
IF @error != 1
BEGIN

SELECT 5 AS result

END