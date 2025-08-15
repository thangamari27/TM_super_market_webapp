const pool = require('../config/mysqlDB');

const getProductItems = async()=>{
    try {
        const [getProductRow] = await pool.query(
            'select * from product_items'
        );

        return getProductRow;
    } catch (error) {
        console.log("Error:",error.message);
    }
};

const createProduct = async(createItems) =>{
    try {
        const {item_name, item_price, stock_quantity} = createItems;
        const [createItemsRow] = await pool.query(
            'INSERT INTO product_items (item_name, item_price, stock_quantity) VALUES (?, ?, ?)',
            [item_name, item_price, stock_quantity]
        );

        return createItemsRow.insertId;
    } catch (error) {
        console.log("Error:",error.message);
    }
};



module.exports = {
    getProductItems,
    createProduct
}