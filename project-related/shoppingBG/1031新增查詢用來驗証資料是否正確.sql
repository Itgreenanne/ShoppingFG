declare @memberIdNo char(10)
set @memberIdNo = 'B112233445'
declare @totalPrice bigint
set @totalPrice = 691
declare @orderNo char(20)
set @orderNo = '22103119203323344509'
--declare @items orderItem
--insert into @items
--values(1, 2, 11)


--IF EXISTS (SELECT 1 AS result FROM t_product left JOIN @items AS TT ON f_unitprice = TT.unirPrice  AND f_quantity >= TT.qtnForBuy)
--begin
--UPDATE t_frontendUser WITH(ROWLOCK)
--SET f_points = f_points - @totalPrice, f_updateTime = GETDATE() WHERE f_idNumber = @memberIdNo

--end

INSERT INTO t_order (f_orderNumber, f_totalPrice, f_discount, f_payment, f_clientId, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address)
select  @orderNo, @totalPrice, 0, @totalPrice, f_id, f_idNumber, f_firstname, f_lastname, f_gender, f_birthday, f_mail, f_phone, f_address FROM t_frontendUser WHERE f_idNumber = @memberIdNo