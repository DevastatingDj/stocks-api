const {
    getAllStocks,
    getStockByName,
    saveStock,
    deleteStock
} = require('../../models/stocks/stocks.model')
const {getPagination} = require('./../../services/paging');

async function httpGetAllStocks(req, res) {
    const { skip, limit } = getPagination(req.query);
    const stocks = await getAllStocks(skip, limit);
    if(stocks)
    return res.status(200).json({
        data: stocks
    });
}

async function httpGetStockByName(req, res) {
    const stock = await getStockByName(req.params.name);
    return res.status(200).json({
        data: stock
    });
}

async function httpSaveStock(req, res) {
    const result = await saveStock(req.body);
    if(result) {
        return res.status(201).json({
            status: "Stock created!"
        });
    } else {
        return res.status(400).json({
            status: "Missing required field",
            sampleBody: {
                symbol: "",
                series: "",
                adjusted52WeekHigh: "",
                adjusted52WeekLow: "",
                weekHighDate: "",
                weekLowDate: ""
            }
        });
    }
}

async function httpDeleteStock(req, res) {
    const stock  = req.body;
    if(stock.symbol) {
        await deleteStock(stock.symbol);
        return res.status(200).json({
            status: "Stock deleted!"
        });
    } else {
        return res.status(400).json({
            status: "Could not find matching symbol",
            sampleBody: {
                symbol: "symbol_name"
            }
        });
    }
}

module.exports = {
    httpGetAllStocks,
    httpGetStockByName,
    httpDeleteStock,
    httpSaveStock
};