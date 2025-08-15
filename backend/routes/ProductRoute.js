const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/',ProductController.getProductController);
router.post('/',ProductController.createProductController);

module.exports = router;