const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

});

module.exports = mongoose.model("fav", favoriteSchema);