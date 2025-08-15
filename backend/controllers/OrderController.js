const OrderModel = require('../models/OrdersModels');

const getOrderController = async (req, res) =>{
    try {
        const getOrderData = await OrderModel.getOrders();
        if(!getOrderData){
            res.status(404).json({success:false, error:"order not found"});
        }
        res.json({success:true, message:"get the data",data:getOrderData})
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
};

const getOrderByIdController = async (req, res) =>{
    try {
        const {id} = req.params;
        const getOrderByIdData = await OrderModel.getOrdersById(id);
         if(!getOrderByIdData.orders){
            res.status(404).json({success:false, error:"order id not found"});
        }
        res.json({success:true, message:"get the data", data:getOrderByIdData});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
};

const addOrderController = async (req, res) =>{
    try {
        const {user_id, items} = req.body;
        const addOrderRow = await OrderModel.createOrder(user_id, items);
        res.status(201).json({success:true, data: addOrderRow, message:"Create new order"})
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
};

const editOrderStatusController = async (req, res) =>{
    try {
        const {id} = req.params;
        const {order_status} = req.body;
        const orderStatusData = await OrderModel.editOrderStatus(id, order_status);
        if(orderStatusData === 0){
            res.status(404).json({success:false, message:"field missing"});
        }
    
        res.json({success:true, message:"edit the order"});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

const deleteOrderController = async (req, res) =>{
    try {
        const {id} = req.params;
        const deleteOrderData = await OrderModel.deleteOrder(id);
        if(deleteOrderData === 0){
            res.status(404).json({success:false, message:"delete data not found"});
        }
        res.json({success:true, message:"delete the data"});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

module.exports = {
    getOrderController,
    getOrderByIdController,
    addOrderController,
    editOrderStatusController,
    deleteOrderController
}