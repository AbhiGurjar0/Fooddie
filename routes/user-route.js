const express = require("express");
const router = express.Router();
const loginRouter = require("../controllers/login-controller");
const { registerUser, loginUser } = require("../controllers/login-controller");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model")
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer");
const orderModel = require("../models/order-model");
const favModel = require("../models/favorite-model");


//Cart 
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id }).populate("cart.productId");
  cartItems = user.cart; 
  let total = 0;
  cartItems.forEach(element => {
    total += element.productId.price;
  });
  res.render("cart", { cartItems, total });
});
//Bills
router.get("/bills", async (req, res) => {
  res.render("bills");
});
// Search

router.post("/search", isLoggedIn, async (req, res) => {
  const query = req.body.q;
  // console.log(query)
  let products = await productModel.find();
  const search = query.trim().toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search)
  );
  res.render("search", { filtered });
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
  let orders = await orderModel.find({ userId: user._id }).populate("productId");
  let favorite = await favModel.find({ userId: user._id }).populate("productId");

  res.render("home", { products, user, categories, orders, favorite });
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

//CheckOut
router.post("/home/cart/checkout", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id }).populate("cart.productId");
  for (const product of user.cart) {
    await orderModel.create({
      userId: user._id,
      orderDate: Date.now(),
      amount: product.productId.price,
      productId: product.productId,
    });
  }

  user.cart = [];
  user.save();
  res.redirect("/home/cart");

})
//cancel Order
router.post("/home/food_orders/cancel", isLoggedIn, async (req, res) => {
  let productId = req.body.productId;
  let order = await orderModel.findOneAndDelete({ _id: req.body.productId });
  res.redirect("/home#food_orders");

})

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
router.post("/additems", upload.single("image"), async (req, res) => {
  let { name, price, discount, category } = req.body;
  await productModel.create({
    image: req.file.buffer,
    name,
    category,
    price,
    discount,
  })
  res.redirect("/home/additems");
})
//Add to Favorite

router.post("/addToFav", isLoggedIn, async (req, res) => {
  let productId = req.body.productId;

  let userId = await userModel.findOne({ _id: req.user._id });

  await favModel.create({
    productId,
    userId,
  })
  res.redirect("/");

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
