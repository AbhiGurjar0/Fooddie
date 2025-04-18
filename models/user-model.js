const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
   },
   { timestamps: true }
);

const userSchema = new mongoose.Schema({

   fullname: String,
   email: String,
   password: String,
   address: [addressSchema],
   cart: [
      {
         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
         quantity: { type: Number, default: 1 },

      }
   ]
});

module.exports = mongoose.model("user", userSchema);