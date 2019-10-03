DROP DATABASE IF EXISTS bamazonDB;

/* Create database */
CREATE DATABASE bamazonDB;
USE bamazonDB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL[10,2] NOT NULL,
  stock_quantity INT (10) NOT NULL,
  PRIMARY KEY (id)
);
