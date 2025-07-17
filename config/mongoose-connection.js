const mongoose = require("mongoose")
const config = require("config");
mongoose.connect(`${config.get("MONGODB_URI")}/food_delivery`)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err =>{
    console.error("Connection error:", err);
})

// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("Connection error:", err));


module.exports = mongoose.connection;