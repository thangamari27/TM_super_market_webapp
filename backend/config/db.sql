create database supermarket;

use supermarket;

-- user table
CREATE TABLE supermarket_users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    phoneno VARCHAR(50),
    roles ENUM('customer', 'admin') DEFAULT 'customer',
    user_address TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- items table
CREATE TABLE product_items(
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    item_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- order table 
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status ENUM('pending','paid','shipped','delivered','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES supermarket_users(user_id)
);

-- order items
CREATE TABLE order_items(
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (item_id) REFERENCES product_items(item_id)
);

INSERT INTO supermarket_users (username, email, password_hash, phoneno, roles)
VALUES 
('tmjk', 'tmjk220@gmail.com', 'tmjk2710', '9876543210', 'customer'),
('tm', 'admin123@gmail.com', 'admin@123', '9876543211', 'admin');

-- Items
INSERT INTO product_items (item_name, item_price, stock_quantity)
VALUES
('Milk 1L', 50.00, 100),
('Bread', 30.00, 50),
('Eggs (dozen)', 80.00, 40);


-- Orders
INSERT INTO orders (user_id, total_amount, order_status)
VALUES
(1, 130.00, 'pending');

-- Order Items
INSERT INTO order_items (order_id, item_id, quantity, price)
VALUES
(1, 1, 1, 50.00), 
(1, 2, 1, 30.00), 
(1, 3, 1, 50.00); 

-- get all users
select * from supermarket_users;

-- get specific user
select * from supermarket_users where user_id = 1;

-- edit user
UPDATE supermarket_users 
             SET username = COALESCE('', username), 
             email = COALESCE('', email), 
             phoneno = COALESCE('', phoneno),  
             user_address = COALESCE('', user_address) 
             WHERE user_id = ''

-- Delete users
Delete from supermarket_users
where user_id = 1

