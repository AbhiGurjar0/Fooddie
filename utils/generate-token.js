const jwt = require("jsonwebtoken");
const key = require("../config/keys");
const generateToken = (user)=>{
    return jwt.sign({ email: user.email},key.JWT_KEY, { expiresIn: "14d" });
}
module.exports.generateToken = generateToken;  
