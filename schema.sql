DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Brooke", "Rodriguez", 1, 1), ("Saku", "Samuelson", 2, 6), ("Jordan", "Wilts", 7, NULL), ("Mike", "Thompson", 3, 4), ("Dave", "Williams", 4, 3), ("Robert", "Mathers", 5, 3), ("Angie", "Marks", 6, 3);

INSERT INTO role(title, salary, department_id)
VALUES ("Design Engineer", 80000.00, 1), ("Engineering Manager", 125000.00, 1), ("Machinist", 90000.00, 2), ("Production Manager", 110000.00, 2), ("Quality Inspector", 80000.00, 3), ("Quality Manager", 125000, 3), ("Chief Officer Of Operations", 250000.00, 4);

INSERT INTO department(name)
VALUES ("Engineering"), ("Production"), ("Quality"), ("Executive Team");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;