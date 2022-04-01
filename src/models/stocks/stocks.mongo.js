const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true,
    },
    adjusted52WeekHigh: {
        type: Number,
        required: true
    },
    weekHighDate: {
        type: Date,
        required: true
    },
    adjusted52WeekLow: {
        type: Number,
        required: true
    },
    weekLowDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Stocks', stocksSchema);