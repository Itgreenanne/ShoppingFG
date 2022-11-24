USE ShoppingBG

DROP TABLE t_duty
CREATE TABLE t_duty
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_name NVARCHAR(20) NOT NULL,
	f_manageDuty BIT NOT NULL,
	f_manageUser BIT NOT NULL,
	f_manageProductType BIT NOT NULL,
	f_manageProduct BIT NOT NULL,
	f_manageOrder BIT NOT NULL,
	f_manageRecord BIT NOT NULL,
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(),
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

DROP TABLE t_backendUser

CREATE TABLE t_backendUser
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_account NVARCHAR(20) NOT NULL, 
	f_nickname NVARCHAR(20) NOT NULL, 
	f_pwd NVARCHAR(20) NOT NULL, 
	f_typeId INT NOT NULL, 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

drop TABLE t_frontendUser
CREATE TABLE t_frontendUser
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_idNumber CHAR(10) NOT NULL, 
	f_firstname NVARCHAR(20) NOT NULL, 
	f_lastname NVARCHAR(20) NOT NULL, 
	f_gender TINYINT NOT NULL, 
	f_birthday CHAR(10) NOT NULL,
	f_pwd NVARCHAR(20) NOT NULL, 
	f_mail VARCHAR(40) NOT NULL, 
	f_phone CHAR(10) NOT NULL, 
	f_address NVARCHAR(200) NULL, 
	f_points BIGINT NOT NULL DEFAULT 0, 
	f_level TINYINT NOT NULL DEFAULT 1, 
	f_balance BIGINT NOT NULL DEFAULT 0, 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

drop  TABLE t_order
CREATE TABLE t_order
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_orderNumber CHAR(20) NOT NULL, 
	f_totalPrice BIGINT NOT NULL, 
	f_discount INT NOT NULL, 
	f_payment BIGINT NOT NULL, 
	f_clientId INT NOT NULL, 
	f_idNumber CHAR(10) NOT NULL, 
	f_firstname NVARCHAR(20) NOT NULL, 
	f_lastname NVARCHAR(20) NOT NULL, 
	f_gender TINYINT NOT NULL, 
	f_birthday CHAR(10) NOT NULL, 
	f_mail VARCHAR(40) NOT NULL, 
	f_phone CHAR(10) NOT NULL, 
	f_address NVARCHAR(200) NOT NULL, 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

 drop TABLE t_orderItem
CREATE TABLE t_orderItem
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_orderId INT NOT NULL, 
	f_productId INT NOT NULL, 
	f_productTitle NVARCHAR(100) NOT NULL, 
	f_number SMALLINT NOT NULL, 
	f_unitPrice INT NOT NULL, 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

drop table t_product
CREATE TABLE t_product
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL,
	f_picturePath NVARCHAR(100),
	f_title NVARCHAR(100), 
	f_unitprice INT, 
	f_quantity SMALLINT, 
	f_typeId INT, 
	f_detail NVARCHAR(3000),
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

drop table t_productType
CREATE TABLE t_productType
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_name NVARCHAR(20), 
	f_detail NVARCHAR(3000), 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

drop table t_operationRecord
CREATE TABLE t_operationRecord
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL,
	f_userId INT,
	f_dataId INT, 
	f_type TINYINT, 
	f_function TINYINT, 
	f_before NVARCHAR(4000), 
	f_after NVARCHAR(4000), 
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

