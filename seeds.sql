/* Seeds for SQL table. We haven't discussed this type of file yet */
USE bamazonDB;

/* Insert 3 Rows into your new table */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4");

INSERT INTO colleges (name)
VALUES ("Boston College");

INSERT INTO colleges (name)
VALUES ("Harvard");

/* OR */
INSERT INTO colleges (name)
VALUES ("Emerson"), ("Northeastern"), ("MIT");