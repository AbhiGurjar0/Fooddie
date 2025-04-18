const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  image:Buffer,
  name:String,
  category:String,
  price:Number,
  discount:{
    type:Number, 
    default:0
  },
  
});

module.exports = mongoose.model("Product",productSchema); 