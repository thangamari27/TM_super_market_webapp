const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/',ProductController.getProductController);
router.get('/:id',ProductController.getProductByIdController);
router.post('/',ProductController.createProductController);
router.put('/:id',ProductController.editProductController);
router.delete('/:id',ProductController.deleteProductController);

module.exports = router;