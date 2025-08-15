const OrderController = require('../controllers/OrderController');

const express = require('express');
const router = express.Router();

router.get('/', OrderController.getOrderController);
router.get('/:id', OrderController.getOrderByIdController);
router.post('/', OrderController.addOrderController);
router.put('/:id', OrderController.editOrderStatusController);
router.delete('/:id', OrderController.deleteOrderController);


module.exports = router;

