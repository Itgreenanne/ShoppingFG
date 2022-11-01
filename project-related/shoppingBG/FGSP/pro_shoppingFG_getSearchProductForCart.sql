USE ShoppingBG
GO

CREATE TYPE idList AS TABLE (
   ProductId INT
);
GO

alter PROCEDURE pro_shoppingFG_getSearchProductForCart @list idList READONLY
AS
BEGIN

--SELECT productId FROM @list

SELECT f_id, f_title, f_unitprice, f_quantity
FROM t_product WHERE f_id IN (SELECT ProductId FROM @list)

END

--CREATE TYPE idList AS TABLE(
--   productId INT
--);
--GO

--ALTER PROCEDURE pro_shoppingFG_getSearchProductForCart @list idList READONLY
--AS
--BEGIN

--SELECT TA.f_id, TA.f_title, TA.f_unitprice, TA.f_quantity
--FROM t_product AS TA WITH(NOLOCK) right join @list AS TB  ON TA.f_id = TB.productId

--END

