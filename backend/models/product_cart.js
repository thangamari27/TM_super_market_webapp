const pool = require('../config/mysqlDB');

const getProductCart = async() =>{
    try {
        const [getRow] = await pool.query('select * from product_cart');
        if(!getRow){
            console.log("data not found in db");
        }
        console.log(getRow);
        return getRow;
    } catch (error) {
        console.log("model errro:",error.message);
    }
};

const createProductCart = async(productcart) =>{
    try {
        const {cart_category, cart_name, cart_price, cart_quantity, cart_stock} = productcart;
        const [createRow] = await pool.query(
            'INSERT INTO product_cart(cart_category, cart_name, cart_price, cart_quantity, cart_stock) VALUES (?, ?, ?, ?, ?)',
            [cart_category, cart_name, cart_price, cart_quantity, cart_stock]
        );

        console.log(createRow);
        return createRow.insertId;
    
    } catch (error) {
        console.log("Error", error.message);
    }
}


module.exports = {
    getProductCart,
    createProductCart
}