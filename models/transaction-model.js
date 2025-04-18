const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    amount: Number,
    date:{
        type:Date,
        deafult:Date.now(),
    } ,
    status: {
        type: String,
        default: "Pending",
    },
})
module.exports = mongoose.model("Transaction", transaction);