const mongoose = require("mongoose")
const config = require("config");

mongoose.connect(`${config.get("MONGODB_URI")}/food_delivery`)
    .then(() => {
       console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

module.exports = mongoose.connection;