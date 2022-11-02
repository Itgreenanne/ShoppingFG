declare @item productOrdered
declare @memberIdNo char(10) = 'N123456789'
declare @totalPrice int = '100'
insert into @item
values(2, 1, 50),(3,1,10)
--VALUES(3,3,100)

IF EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice OR f_quantity < TT.QtnForBuy)) 
BEGIN

DECLARE @A INT 
SET @A=1

END

else IF EXISTS (SELECT f_id from t_frontendUser WHERE f_idNumber = @memberIdNo AND f_points - @totalPrice < 0 )
BEGIN

DECLARE @b INT 
SET @b=2

END 

--select f_points from t_frontendUser where f_idNumber = @memberIdNo
select @b
 

--IF  EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice OR f_quantity < TT.QtnForBuy))
--BEGIN

--DECLARE @A INT 
--SET @A=1

--END

--SELECT @A



