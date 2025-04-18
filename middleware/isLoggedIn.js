let jwt = require("jsonwebtoken");
let userModel = require("../models/user-model");
let keys = require("../config/keys");

module.exports = async (req, res,next) => {
    try{
        let token = req.cookies.token;
        if(!token){ 
           console.log("you are not logged in !");
           return res.redirect("/signin");
        } 
        
        let decoded = jwt.verify(token,keys.JWT_KEY);
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        if(!user){
           console.log("user not found");
           return res.status(500).json({ message: "Token verification failed" });
        }
        req.user = user; 
        next();
    }
    catch(error){
        console.log("error in token verification");
        return res.redirect("/signin");
        // return res.status(500).json({ message: "Token verification failed" });
    }
}