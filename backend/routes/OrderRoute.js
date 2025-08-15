const OrderController = require('../controllers/OrderController');

const express = require('express');
const router = express.Router();

router.get('/', OrderController.getOrderController);
router.get('/:id', OrderController.getOrderByIdController);
router.put('/', OrderController.addOrderController);


module.exports = router;

