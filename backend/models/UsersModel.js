const pool = require('../config/mysqlDB');

const getAllUsers = async() =>{
    try {
        const [getUserRow] = await pool.query('select * from supermarket_users');
        if(!getUserRow){
            console.log("User not found in the db");
        }
        
        return getUserRow;
    } catch (error) {
        console.log("Error:",error.message);
    }
};

const getUsersById = async(id)=>{
    try {
        const [getUserRow] = await pool.query(
            'select * from supermarket_users where user_id = ?',
            [id]
        );
      
        return getUserRow[0];
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const getUserByEmail = async (email, password_hash) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM supermarket_users WHERE email = ? AND password_hash = ?",
      [email, password_hash]
    );

   
    return rows.length > 0 ? rows[0] : null; 
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const createUsers = async (userfields) => {
  try {
    const { username, email, password_hash, phoneno, roles, user_address } = userfields;

    if (!username || !email || !password_hash) {
      throw new Error("Missing required fields");
    }

    const [result] = await pool.query(
      'INSERT INTO supermarket_users (username, email, password_hash, phoneno, roles, user_address) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, password_hash, phoneno, roles, user_address]
    );

    return result.insertId;
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error; 
  }
};


const editUsers = async(id, editUsersData) =>{
    try {
        const {username, email, phoneno, user_address} = editUsersData; 
        const [editUsersRow] = await pool.query(
            `UPDATE supermarket_users 
             SET username = COALESCE(?, username), 
             email = COALESCE(?, email), 
             phoneno = COALESCE(?, phoneno), 
             user_address = COALESCE(?, user_address) 
             WHERE user_id = ?`,
             [username, email, phoneno, user_address, id]
        );

        return editUsersRow.affectedRows;
    } catch (error) {
        console.log("Error:", error.message);
    }    
};

const deleteUsers = async(id) =>{
    try {
        const [deleteUserRow] = await pool.query(
            'delete from supermarket_users where user_id = ?',
            [id]
        );

        return deleteUserRow.affectedRows;
    } catch (error) {
        console.log("Error:", error.message);
    }
}

module.exports = {
    getAllUsers,
    getUsersById,
    getUserByEmail,
    createUsers,
    editUsers,
    deleteUsers
}