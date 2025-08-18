const getUsersController = require('../controllers/UsersController');
const express = require('express');

const router = express.Router();

router.get('/', getUsersController.getAllUsersController);
router.get('/:id', getUsersController.getUsersByIdController);
router.put('/:id', getUsersController.editUsersController);
router.delete('/:id', getUsersController.deleteUserController);

router.post('/signup', getUsersController.CreateUserController);
router.post('/login', getUsersController.getUserByEmailController);


module.exports = router;