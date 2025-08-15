const productModel = require('../models/ProductModels');

const getProductController = async(req, res)=>{
    try {
        const getProductData = await productModel.getProductItems();
        if(!getProductData){
            res.status(404).json({success:false, error:"product items not found"});
        }

        res.json({success:true, data:getProductData});
    } catch (error) {
        res.status(500).json({success:false, error:"Server Error"});
    }
}

const getProductByIdController = async(req, res) =>{
    try {
        const {id} = req.params;
        const getByIdData = await productModel.getProductById(id);
        if(!getByIdData){
            res.status(404).json({success:false, error:"product id not found"});
        }
        res.json({success:true, data:getByIdData});
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
};

const editProductController = async(req, res) =>{
    try {
        const {id} = req.params;
        const {item_name, item_price, stock_quantity} = req.body;
        const editProductData = await productModel.editProduct(id,{item_name, item_price, stock_quantity});
        if(editProductData === 0){
            return res.status(400).json({success:false, error:"missing fields value"})
        }
        res.json({success:true, message:"product data updated"});
    } catch (error) {
        res.status(500).json({success:false, error:"Server error"});
    }
};

const deleteProductController = async(req, res) =>{
    try {
        const {id} = req.params;
        const deleteProductData = await productModel.deleteProduct(id);
        if(!deleteProductData){
            res.status(404).json({success:false, error:"Product not found"});
        }
        res.json({success:true, message:"delete the product data"});
    } catch (error) {
        res.status(500).json({success:false, error:"Server error"});
    }
}

module.exports = {
    getProductController,
    getProductByIdController,
    createProductController,
    editProductController,
    deleteProductController
}