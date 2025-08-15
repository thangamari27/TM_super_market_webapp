const getUsersModel = require('../models/UsersModel');

const getAllUsersController = async(req, res) =>{
    try {
        const getAllUsersData = await getUsersModel.getAllUsers();
        if(!getAllUsersData){
            res.status(404).json({success:true, error:"user not found"});
        }
        res.json({success:true, data:getAllUsersData});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

const getUsersByIdController = async(req, res) =>{
    try {
        const getUsersByIdData = await getUsersModel.getUsersById(req.params.id);
        if(!getUsersByIdData){
            res.status(404).json({success:false, error:"user not found"});
        }
        res.json({success:true, data:getUsersByIdData});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
};

const CreateUserController = async(req, res) =>{
    try {
        const {username, email, password_hash, phoneno, roles, user_address} = req.body;

        const createUserData = await getUsersModel.createUsers({username, email, password_hash, phoneno, roles, user_address});
        if(!username, !email, !password_hash){
            return res.status(400).json({success:false, error:"missing fields value"})
        }
        res.status(201).json({success:true, message:"create new user successfully"});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }
}

const editUsersController = async(req, res) =>{
    try {
        const {id} = req.params;
        const {username, email, phoneno, user_address} = req.body;
        const editUsersData = await getUsersModel.editUsers(id, {username, email, phoneno, user_address});
       
        if(editUsersData === 0){
            return res.status(404).json({success:false, error:"User not found"})
        }
        res.json({success:true, message:"Update the user record"});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"});
    }

};

const deleteUserController = async(req, res) =>{
    try {
       const {id} = req.params;
       const deleteUserData = await getUsersModel.deleteUsers(id);
       if(deleteUserData === 0){
            return res.status(404).json({success:false, error:"User not found"})
        }
        res.json({success:true, message:"delete the user record"});
    } catch (error) {
        res.status(500).json({success:false, error:"server error"}); 
    }
}

module.exports = {
    getAllUsersController,
    getUsersByIdController,
    CreateUserController,
    editUsersController,
    deleteUserController
}