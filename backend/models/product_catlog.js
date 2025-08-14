const pool = require('../config/mysqlDB');
// get products in the catlog table
const getProductCatlog = async() =>{
   try {
        const [getRow] = await pool.query('SELECT * FROM product_catlog');
        console.log(getRow);
        return getRow;
   } catch (error) {
        console.log("model error:"+error.message);
   }
}

// Add the product in the catlog table
const createProductCatlog = async(products) =>{
    const {product_category, product_name, product_price, product_stock} = products;
    try{
        const [createRow] =  await pool.query('INSERT INTO product_catlog(product_category, product_name, product_price, product_stock) Values(?, ?, ?, ?)', [product_category, product_name, product_price, product_stock]);
        console.log(createRow);
        return createRow.insertId;
    }
    catch(error){
        console.log("model error:"+error.message);
    }
}
module.exports = {
    getProductCatlog,
    createProductCatlog
}