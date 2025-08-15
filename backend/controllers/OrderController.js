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
        res.json({success:true, message:"Create new order"})
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}



module.exports = {
    getOrderController,
    getOrderByIdController,
    addOrderController
}