declare @item productOrdered
insert into @item
values(2, 1, 10),(3,1,5)
--VALUES(3,3,100)

IF  EXISTS (SELECT f_id FROM t_product WHERE f_id IN (SELECT ProductId FROM @item AS TT WHERE f_unitprice != TT.UnitPrice OR f_quantity < TT.QtnForBuy))
BEGIN

DECLARE @A INT 
SET @A=1

END

SELECT @A



