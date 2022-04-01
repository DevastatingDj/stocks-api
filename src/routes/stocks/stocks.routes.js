const express = require('express');
const { 
    httpGetAllStocks,
    httpGetStockByName,
    httpSaveStock,
    httpDeleteStock
} = require('./stocks.controller');
const checkAuthorization = require('../../services/authorization');
const router = express.Router();

router.get('/', httpGetAllStocks);
router.get('/:name', httpGetStockByName);
router.post('/save', checkAuthorization, httpSaveStock);
router.delete('/delete', checkAuthorization, httpDeleteStock);

module.exports = {
    stocksRouter: router
};