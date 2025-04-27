let mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,

})

module.exports = mongoose.model("Admin", adminSchema);