# MysqlConnectionWithCRUD
To start this project, you need install:
Nodemon, Mysql, body-parser, express

-----------------------------------------------------

Need this

Use EmployeeDB;

CREATE TABLE `employee` (
	`EmpID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(45) DEFAULT NULL,
    `EmpCode` varchar(45) DEFAULT NULL,
    `Salary` int(11) DEFAULT NULL,
    PRIMARY KEY (`EmpID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

------------------------------------------------------------------

LOCK TABLES `employee` WRITE;
INSERT INTO `employee` VALUES (1, 'Gavin Cortez', 'EMP90', 265400),(2, 'Quinn Flynn', 'EMP94', 364600),(3, 'Doris Wilder', 'EMP06', 316400),(4, 'Hermione Butler', 'EMP965', 417500);
UNLOCK TABLES;

------------------------------------------------------------------
#VERY IMPORTANT


If there is a problem connecting DB ...
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '@root';
flush privileges;

------------------------------------------------------------------




CREATE PROCEDURE `EmployeeAddOrEdit`(
IN _EmpID INT,
IN _Name varchar(45),
IN _EmpCode varchar(45),
IN Salary int
)

BEGIN
	IF _EmpID = 0 THEN
		INSERT INTO employee(Name, EmpCode, Salary)
		VALUES (_Name, _EmpCode, _Salary);

		SET _EmpID = LAST_INSERT_ID();
	ELSE
		UPDATE Employee
		SET
		Name = _Name,
		EmpCode = _EmpCode,
		Salary = _Salary
		WHERE EmpID = _EmpID;
	END IF;

	SELECT _EmpID as 'EmpId';
END
