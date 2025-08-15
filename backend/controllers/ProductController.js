const productModel = require('../models/ProductModels');

const getProductController = async(req, res)=>{
    try {
        const getProductData = await productModel.getProductItems();
        if(!getProductData){
            res.status(404).json({success:false, error:"product not found"});
        }

        res.json({success:true, data:getProductData});
    } catch (error) {
        res.status(500).json({success:false, error:"Server Error"});
    }
}

const createProductController = async(req, res) =>{
    try {
        const {item_name, item_price, stock_quantity} = req.body;
        const createProductData = await productModel.createProduct({item_name, item_price, stock_quantity});
        if(!item_name, !item_price, !stock_quantity){
            return res.status(400).json({success:false, error:"missing fields value"})
        }
        res.status(201).json({success:true, message:"Creat new product successful"});
    } catch (error) {
        res.status(500).json({success:false, error:"Server Error"});
    }
}

module.exports = {
    getProductController,
    createProductController
}