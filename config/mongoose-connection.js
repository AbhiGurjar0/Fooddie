const mongoose = require("mongoose")
const config = require("config");

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection error:", err));





module.exports = mongoose.connection;