create database supermarket;

use supermarket;

CREATE TABLE supermarket_users(
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    phoneno VARCHAR(50),
    roles ENUM('customer', 'admin', 'staff') DEFAULT 'customer',
    user_address TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_category(
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    category_description TEXT
);

CREATE TABLE product_items(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    product_name VARCHAR(100),
    product_price DECIMAL(10,2) NOT NULL,
    product_status ENUM('active','inActive') DEFAULT 'active',
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_category(category_id)
);

CREATE TABLE product_inventory(
    inventoryid INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL DEFAULT 0,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product_items(product_id)
);

create TABLE product_cart(
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES supermarket_users(userid)
);

CREATE TABLE product_cart_items(
    cart_items_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES product_cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES product_items(product_id)
);

CREATE TABLE product_order(
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status ENUM('pending','paid','shipped','delivery', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid', 'refound') DEFAULT 'unpaid',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES supermarket_users(userid)
);

CREATE TABLE product_order_items(
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES product_order(order_id),
    FOREIGN KEY (product_id) REFERENCES product_items(product_id)
);

CREATE TABLE product_payment(
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method ENUM('Cash','upi','card','netbanking') NOT NULL,
    product_amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending','complete','failed') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES product_order(order_id)
);

