
DROP TABLE t_logTest
CREATE TABLE t_logTest
(
	f_id INT IDENTITY(1,1) PRIMARY KEY  NOT NULL, 
	f_dataId INT, 
	f_type TINYINT, 
	f_function INT,	
	f_createTime DATETIME NOT NULL DEFAULT GETDATE(), 
	f_updateTime DATETIME NOT NULL DEFAULT GETDATE()
)

GO