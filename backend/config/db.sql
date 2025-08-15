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

-- create the product cart 
CREATE TABLE product_cart(
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_category VARCHAR(50),
    cart_name VARCHAR(50),
    cart_price DECIMAL(10,2) NOT NULL,
    cart_quantity INT NOT NULL,
    cart_stock INT NOT NULL DEFAULT 0,
    cart_status ENUM ('pending','reject','success') NOT NULL DEFAULT 'pending',
    cart_createAs TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product_cart(cart_category, cart_name, cart_price, cart_quantity, cart_stock) VALUES 
('Vegetables', 'Potato', 40.00, 1,100),
('Vegetables', 'Tomato', 30.00, 2,150),
('Fruits', 'Apple', 120.00, 3,50),
('Snacks', 'Chips', 20.00, 4,200);