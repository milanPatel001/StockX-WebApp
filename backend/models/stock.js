
const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true,
    },
    assetType: {
        type: String,
        requried: true

    },
    ipoDate: {
        type: String,
        requried: true

    }
});


const Stock = mongoose.model('Stock', stockSchema);


module.exports.Stock = Stock;