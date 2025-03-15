const express = require("express");
const router = express.Router();
const loginRouter = require("../controllers/login-controller");
const {registerUser,loginUser} = require("../controllers/login-controller");

router.get("/", async (req, res) => {
    res.render("index");
});
router.get("/signin", (req, res) => {
    res.render("login");
});
router.get("/home", (req, res) => {
    res.render("home");
});
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
