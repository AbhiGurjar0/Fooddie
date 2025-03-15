const mongoose = require("mongoose")
const config = require("config");
const debugNamespace = process.env.NODE_ENV === "development" ? "dev:mongoose" : "prod:mongoose";
const dbgr = require("debug")(debugNamespace);

// const dbgr = require("debug")("development:mongoose");
mongoose.connect(`${config.get("MONGODB_URI")}/Manipal`)
    .then(() => {
        dbgr("MongoDB connected successfully!");
    })
    .catch((error) => {
        dbgr("MongoDB connection error:", error);
    });

module.exports = mongoose.connection;