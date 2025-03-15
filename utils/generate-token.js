const jwt = require("jsonwebtoken");
const generateToken = (user)=>{
    return jwt.sign({ email: user.email}, process.env.JWT_KEY, { expiresIn: "7d" });
}
module.exports.generateToken = generateToken; 
