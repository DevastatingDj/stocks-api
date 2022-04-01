const {getAllStocks, getStockByName} = require('./stocks.model');

module.exports = {
    Query: {
        stocks: () => {
            return getAllStocks();
        },
        stockByName: (_, args) => {
            return getStockByName(args.name);
        }
    }
}