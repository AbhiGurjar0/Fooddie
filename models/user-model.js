const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

   fullname: String,
   email: String,
   password: String,
   cart: [
      {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: {type:Number,default:1},

      }
   ]
});

module.exports = mongoose.model("user", userSchema);