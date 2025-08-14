create database supermarket;

use supermarket;

-- create table for catlog
CREATE TABLE product_catlog(
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_category VARCHAR(50),
    product_name VARCHAR(50),
    product_price DECIMAL(10,2) NOT NULL,
    product_stock INT NOT NULL DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product_catlog(product_category, product_name, product_price, product_stock)
VALUES
('Vegetables', 'Potato', 40.00, 100),
('Vegetables', 'Tomato', 30.00, 150),
('Fruits', 'Apple', 120.00, 50),
('Snacks', 'Chips', 20.00, 200);

