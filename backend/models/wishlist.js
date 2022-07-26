const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true
    }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports.Wishlist = Wishlist;