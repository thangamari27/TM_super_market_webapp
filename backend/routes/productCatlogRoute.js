const {getCatlogController, createCatlogController} = require('../controllers/productCatlogController');
const express = require('express');

const router = express.Router();

router.get('/', getCatlogController);
router.post('/', createCatlogController);

module.exports = router;