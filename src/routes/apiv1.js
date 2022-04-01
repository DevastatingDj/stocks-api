const express = require('express');
const { stocksRouter } = require('./stocks/stocks.routes')
const routerV1 = express.Router();

// Routes
routerV1.use('/stocks', stocksRouter);

module.exports = {
    routerV1
}