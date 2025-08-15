const getUsersController = require('../controllers/getUsersController');
const express = require('express');

const router = express.Router();

router.get('/', getUsersController.getAllUsersController);
router.get('/:id', getUsersController.getUsersByIdController);
router.post('/', getUsersController.CreateUserController);
router.put('/:id', getUsersController.editUsersController);
router.delete('/:id', getUsersController.deleteUserController);

module.exports = router;