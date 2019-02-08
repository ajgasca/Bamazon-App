CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Dark Knight", "Movies", 19.95, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catan", "Games", 24.95, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Goldfinch", "Books", 14.95, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Computers", 1399.95, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Love, Simon", "Movies", 24.95, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Games", 9.95, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lord of the Flies", "Books", 4.95, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP Pavilion", "Computers", 799.95, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mean Girls", "Movies", 9.95, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo Thinkpad", "Computers", 999.95, 15);

SELECT * FROM products;