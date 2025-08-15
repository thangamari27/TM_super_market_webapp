const pool = require('../config/mysqlDB');

const getOrders = async() =>{
    try {
        const [getOrdersRow] = await pool.query('select * from orders');
        return getOrdersRow;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const getOrdersById = async(id) =>{
    try {
        const [getOrderRow] = await pool.query('select * from orders where order_id = ?', [id]);
        const [getOrderItemRow] = await pool.query('select * from order_items where order_id = ?',[id]);
        console.log(getOrderRow);
        console.log(getOrderItemRow);
        return {orders: getOrderRow[0], items: getOrderItemRow};
    } catch (error) {
        console.log("Error:", error.message);
    }
};


const createOrder = async(user_id, items)=>{
    try {
        let total_amount = 0;
        items.forEach(item => {
            total_amount += item.price * item.quantity;
        });

        const [createOrderRow] = await pool.query(
            `INSERT INTO orders (user_id, total_amount, order_status) VALUES (?, ?, 'pending')`,
            [user_id, total_amount]
        );
        console.log(createOrderRow);

        const order_id = createOrderRow.insertId;

        for(let item of items){
            await pool.query(
                'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
                [order_id, item.item_id, item.quantity, item.price]
            );
        }
                
          return order_id;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const editOrderStatus = async(id, order_status) =>{
    try {
        const [editOrderRow] = await pool.query(
            'UPDATE orders SET order_status = ? WHERE order_id = ?',
            [order_status, id]
        );

        return editOrderRow.affectedRows;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const deleteOrder = async(id)=>{
    try {
        await pool.query('DELETE FROM order_items WHERE order_id = ? ',[id]);
        const [deleteOrderRow] = await pool.query('DELETE FROM orders WHERE order_id = ?',[id]);

        return deleteOrderRow.affectedRows;
    } catch (error) {
        console.log("Error:", error.message);
    }
}

module.exports = {
    getOrders,
    getOrdersById,
    createOrder,
    editOrderStatus,
    deleteOrder
}