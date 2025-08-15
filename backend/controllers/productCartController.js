const productCart = require('../models/product_cart');

const getProductCartController = async(req, res) =>{
    try {
        const getCartData = await productCart.getProductCart();
        if(!getCartData){
            return res.status(404).json({success:false, error:"data not found"});
        }
        res.json({success:true, message:"get data successful", getCartData});
    
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
};

const createProductCartController = async(req, res) =>{
    try {
        const {cart_category, cart_name, cart_price, cart_quantity, cart_stock} = req.body;
        if(!cart_category || !cart_name || !cart_price || !cart_quantity || !cart_stock){
            res.status('400').json({success:false, error:"Some fields missing"});
        }
        const insertId = await productCart.createProductCart(
            {cart_category, cart_name, cart_price, cart_quantity, cart_stock}
        );

        res.status(201).json({success:true, message:"Create product cart successful", cart_id:insertId});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

module.exports = {
    getProductCartController,
    createProductCartController
}