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

const getProductById = async(id) =>{
    try {
        const [getByIdRow] = await pool.query(
            'select * from product_items where item_id = ?',
            [id]
        );

        return getByIdRow[0];
    } catch (error) {
        console.log("Error:",error.message);
    }
}

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

const editProduct = async(id, editData)=>{
    try {
        const {item_name, item_price, stock_quantity} = editData;
        const [editProductRow] = await pool.query(
            `UPDATE product_items
             SET item_name = COALESCE(?, item_name),
             item_price = COALESCE(?, item_price),
             stock_quantity = COALESCE(?, stock_quantity)
             WHERE item_id = ?
            `,
            [item_name, item_price, stock_quantity, id]
        );
       
        return editProductRow.affectedRows;
    } catch (error) {
        console.log("Error:",error.message);
    }
}

const deleteProduct = async(id) =>{
    try {
        const [deleteItemRow] = await pool.query(
            'DELETE FROM product_items WHERE item_id = ?',
            [id]
        );
        console.log(deleteItemRow.affectedRows);
        return deleteItemRow.affectedRows;
    } catch (error) {
        console.log("Error:",error.message);
    }
}

module.exports = {
    getProductItems,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}