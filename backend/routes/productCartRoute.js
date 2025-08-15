const {getProductCartController, createProductCartController} = require('../controllers/productCartController');
const express = require('express');

const router = express.Router();

router.get('/', getProductCartController);
router.post('/', createProductCartController);


module.exports = router;