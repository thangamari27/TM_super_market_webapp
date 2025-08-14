const { json } = require('express');
const {getProductCatlog, createProductCatlog} = require('../models/product_catlog');

const getCatlogController = async(req, res) =>{
    try {
        const getCatlogData = await getProductCatlog();
        console.log(getCatlogData);
        if(!getCatlogData){
            return res.status(404).json({success:false, error:"product data not found"});
        }
        res.json({success:true, getCatlogData});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

const createCatlogController = async(req, res)=>{
    try {
        const {product_category, product_name, product_price, product_stock} = req.body;
       
        if(!product_category || !product_name || !product_price || !product_stock){
            return res.status(400).json({success:false, error:"All fields required"});
        }
       
        const insertId = await createProductCatlog({product_category, product_name, product_price, product_stock});
        res.status(201).json({success:true, message:"create product successful", productId: insertId});
    } catch (error) {
        json.status(500).json({success:false, error:"server error"});
    }
}

module.exports ={ 
    getCatlogController,
    createCatlogController
};
