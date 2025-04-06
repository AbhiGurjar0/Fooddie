const express = require("express");
const router = express.Router();
const loginRouter = require("../controllers/login-controller");
const { registerUser, loginUser } = require("../controllers/login-controller");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model")
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer");



router.get("/cart",isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id }).populate("cart.productId");
  cartItems = user.cart;
  let total = 0;
  cartItems.forEach(element => {
    total+=element.productId.price;
  });
  res.render("cart",{cartItems,total}); 
});
router.get("/bills", async (req, res) => {
  res.render("bills");
});



//sign in 
router.get("/signin", (req, res) => {
  res.render("login");
});

//home 

router.get("/", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let user = await userModel.findOne({ _id: req.user._id }).populate("cart.productId");
  let categories = await productModel.distinct("category");
  res.render("home", { products, user ,categories});
});

//All categories
router.get("/home/category", async (req, res) => {
  let products = await productModel.find();
  res.render("category", { products });
});

//add to cart
router.post("/home/cart", isLoggedIn, async (req, res) => {
  let userId = req.user._id;
  let { productId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (!user) {
    res.send("User not found");
  }
  let existingProduct = user.cart.find(item => item.productId.toString() === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  }
  else {
    user.cart.push({ productId, quantity: 1 });
  }
  await user.save();
  res.json({ message: "Product added to cart successfully" });
});

//delete Items

router.post("/home/cart/delete", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id });
  let productID = req.body;
  console.log(productID.productId);
  user.markModified("cart");
  user.cart = user.cart.filter(product => product._id != productID.productId);
  await user.save();
  res.json({ message: "Product deleted successfully" });
});

//add items by admin
router.post("/additems",upload.single("image"), async (req, res) => {
  let { name, price, discount, category } = req.body;
  await productModel.create({
    image : req.file.buffer,
    name, 
    category,
    price,
    discount,
  })
  res.redirect("/home/additems");
})

//Add items panel
router.get("/home/additems", (req, res) => {
  res.render("addProducts");
})
//Login
router.post("/login", loginUser);

//Register
router.post("/register", registerUser);

module.exports = router;
