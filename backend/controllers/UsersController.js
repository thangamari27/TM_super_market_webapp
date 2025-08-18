const getUsersModel = require('../models/UsersModel');

const getAllUsersController = async(req, res) =>{
    try {
        const getAllUsersData = await getUsersModel.getAllUsers();
        if(!getAllUsersData){
            return res.status(404).json({success:true, error:"user not found"});
        }
        return res.json({success:true, data:getAllUsersData});
    } catch (error) {
        return res.status(500).json({success:false, error:"server error"});
    }
}

const getUsersByIdController = async(req, res) =>{
    try {
        const getUsersByIdData = await getUsersModel.getUsersById(req.params.id);
        if(!getUsersByIdData){
            return res.status(404).json({success:false, error:"user not found"});
        }
        return res.json({success:true, data:getUsersByIdData});
    } catch (error) {
        return res.status(500).json({success:false, error:"server error"});
    }
};

const getUserByEmailController = async (req, res) => {
  try {
    const { email, password_hash } = req.body; 

    if (!email || !password_hash) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const user = await getUsersModel.getUserByEmail(email, password_hash);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found or invalid credentials" });
    }

    return res.json({
      success: true,
      role: user.role,
      user
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const CreateUserController = async (req, res) => {
  try {
    const { username, email, password_hash, phoneno, roles, user_address } = req.body;

    if (!username || !email || !password_hash) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const userId = await getUsersModel.createUsers({
      username,
      email,
      password_hash,
      phoneno,
      roles,
      user_address
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};


const editUsersController = async(req, res) =>{
    try {
        const {id} = req.params;
        const {username, email, phoneno, user_address} = req.body;
        const editUsersData = await getUsersModel.editUsers(id, {username, email, phoneno, user_address});
       
        if(editUsersData === 0){
            return res.status(404).json({success:false, error:"User not found"})
        }
        return res.json({success:true, message:"Update the user record"});
    } catch (error) {
        return res.status(500).json({success:false, error:"server error"});
    }

};

const deleteUserController = async(req, res) =>{
    try {
       const {id} = req.params;
       const deleteUserData = await getUsersModel.deleteUsers(id);
       if(deleteUserData === 0){
            return res.status(404).json({success:false, error:"User not found"})
        }
        return res.json({success:true, message:"delete the user record"});
    } catch (error) {
        return res.status(500).json({success:false, error:"server error"}); 
    }
}

module.exports = {
    getAllUsersController,
    getUsersByIdController,
    getUserByEmailController,
    CreateUserController,
    editUsersController,
    deleteUserController
}