const jwt = require("jsonwebtoken");
const key = require("../config/keys");
const generateToken = (user)=>{
    return jwt.sign({ email: user.email},key.JWT_KEY, { expiresIn: "7d" });
}
module.exports.generateToken = generateToken; 
