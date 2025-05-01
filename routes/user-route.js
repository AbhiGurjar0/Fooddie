const express = require("express");
const router = express.Router();
const loginRouter = require("../controllers/login-controller");
const { registerUser, loginUser, logout } = require("../controllers/login-controller");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model")
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer");
const orderModel = require("../models/order-model");
const favModel = require("../models/favorite-model");
const transactionModel = require("../models/transaction-model");


// router.get("/address", isLoggedIn, async (req, res) => {
//   let user = await userModel.findOne({ _id: req.user._id });
//   res.render("address", { user });
// })
// Adding Address
router.post("/addAddress", isLoggedIn, async (req, res) => {
  let { name, phoneNumber, pincode, nearPlace, address, city, state } = req.body;
  let user = await userModel.findOne({ _id: req.user._id });
  const newAddress = {
    name,
    phoneNumber,
    pincode,
    nearPlace,
    address,
    city,
    state,

  };
  user.address.push(newAddress);
  await user.save();
  res.redirect("/");
})
//Cart 
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id }).populate("cart.productId");
  let cartItems = user.cart.filter(item => item.productId !== null);

  let total = 0;
  cartItems.forEach(element => {

    total += (element.productId.price) * (element.quantity);
  });
  res.render("cart", { cartItems, total });
});
//Bills
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
  let orders = await orderModel.find({ userId: user._id }).populate("productId");
  let favorite = await favModel.find({ userId: user._id }).populate("productId");
  let transaction = await transactionModel.find({ user: user._id });
  let addresses = user.address;
  res.render("home", { products, user, categories, orders, favorite, transaction, addresses });
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
  let existingProduct = user.cart.find(item => item.productId.toString() == productId);
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
  let total = 0;

  if (user.cart && user.cart.length > 0) {
    for (const product of user.cart) {
      total += (product.productId.price * product.quantity);
      await orderModel.create({
        userId: user._id,
        orderDate: Date.now(),
        amount: product.productId.price,
        productId: product.productId,
        status: "Pending",
      });
    }
    await transactionModel.create({
      user: user._id,
      amount: total,
      date: Date.now(),
      status: "Completed",
    })

    user.cart = [];
    user.save();

  }
  res.redirect("/#food-orders");


})
//cancel Order
router.post("/home/food_orders/cancel", isLoggedIn, async (req, res) => {
  // let productId = req.body.productId;
  let order = await orderModel.findOneAndDelete({ _id: req.body.productId });
  res.redirect("/home#food_orders");

})

router.post("/updateStatus/:id", async (req, res) => {
  let { status } = req.body;
  console.log(status);
  let order = await orderModel.findOneAndUpdate({ _id: req.params.id }, { status });
  res.redirect("/admin");
})

//delete Items
router.post("/home/cart/delete", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id });
  let productID = req.body;
  // console.log(productID.productId);
  user.markModified("cart");
  user.cart = user.cart.filter(product => product._id != productID.productId);
  await user.save();
  // res.redirect("/cart");
  res.json({ message: "Product deleted successfully" });
});


//Add to Favorite

router.post("/addToFav", isLoggedIn, async (req, res) => {
  try {
    let { productId } = req.body;
    let userId = req.user._id;
    // console.log(productId);
    let exist = await favModel.findOne({ productId, userId });
    if (exist) {
      await favModel.findOneAndDelete({ productId, userId });
      return res.send("1");
    }

    await favModel.create({
      productId,
      userId,
    })
    res.send("0");

  }
  catch (error) {
    console.log(error)
    res.status(500).send("something went wrong")

  }
})

// Add Address(user)
router.get("/addAddress", (req, res) => {
  res.render("addAddress");
})

// Update Address
router.get("/updateAddress", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  // console.log(user);
  res.render("editAddress", { user });
})
// Updating.. Address
router.post("/updateAddress", isLoggedIn, async (req, res) => {
  let { name, phoneNumber, pincode, address, nearPlace, state, city } = req.body;
  await userModel.findOneAndUpdate(
    { email: req.user.email },
    {
      address: {
        name,
        phoneNumber,
        address,
        nearPlace,
        city,
        state,
        pincode

      }
    },
    { new: true, runValidators: true }
  );
  res.redirect("/");
})
// Add items panel
router.get("/home/additems", (req, res) => {
  res.render("admin");
})
// Login
router.post("/login", loginUser);

//Register
router.post("/register", registerUser);
//Logout
router.get("/logout", logout);
//admin panel
router.get("/admin", async (req, res) => {
  let products = await productModel.find();
  let users = await userModel.find();
  let orders = await orderModel.find().populate("productId");
  res.render("dashboard", { products, users, orders });

})

//add items by admin
router.post("/additems", upload.single("image"), async (req, res) => {
  let { name, price, discount, category, quantity } = req.body;
  await productModel.create({
    image: req.file.buffer,
    name,
    category,
    price,
    discount,
    quantity,
  })
  res.redirect("/home/additems");
})
router.post("/updateStatus", async (req, res) => {

  let { productId, status } = req.body;
  await orderModel.findOneAndUpdate({ _id: productId }, {
    status
  }, { new: true, runValidators: true });
  res.send("Successfully status changed");
})

router.post("/deleteItem", async (req, res) => {
  await productModel.findOneAndDelete({ _id: req.body.productId });
  res.send("Successfully deleted");
})

router.post("/deleteDeleted", async (req, res) => {
  await orderModel.findOneAndDelete({ _id: req.body.productId });
  res.send("Deleted Successfully");
})
// router.get("/analytics", (req, res) => {
//   res.render("tracking")
// })

router.post("/deleteUser", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.body.userId });
  res.send("User deleted Successfully");

})

router.get("/admin/editProducts/:id", async (req, res) => {
  let product = await productModel.findOne({ _id: req.params.id });
  res.render("editProducts", { product });
})

router.post("/admin/updateProduct/:id", upload.single("images"), async (req, res) => {
  let { name, quantity, category, price, discount } = req.body;
  let product = await productModel.findOneAndUpdate(req.params.id);
  let updateData = {
    name,
    quantity,
    category,
    price,
    discount,
    image: req.file ? req.file.buffer : product.image,
  }

  await productModel.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.redirect("/admin");
})

router.get("/admin/userDetails", async (req, res) => {

  res.render("userDetails");
})

module.exports = router; 
