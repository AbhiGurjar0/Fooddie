const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {generateToken} = require("../utils/generate-token");

module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email })
        if(user){
            res.send("User already exists ");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        })
        res.redirect("/signin");
    } catch (e) {
        res.send("error");
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;
        let user = await userModel.findOne({ email});
        if (!user) {
            res.send("User not found");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                return res.redirect("/");
            }
            else {
                res.send("Invalid password");
            }
        })
    } catch (e) {
        res.send(e);
    }
}
