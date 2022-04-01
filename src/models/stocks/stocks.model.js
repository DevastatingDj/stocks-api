const path = require('path');
const stocksModel = require('./stocks.mongo');
const { readCSV, validateStock } = require('../../services/csv-file-reader');

async function loadStocksData() {
    const result = await stocksModel.findOne({});
    if(!result) {
        await readCSV(path.join(__dirname, '..', '..', 'data', 'stocks-file.csv')).then((data) => {
            data.forEach(saveStock);
        });
    }
}

async function saveStock(data) {
    try {
      const stock = validateStock(data);
      if(stock) {
        save = {
          symbol: stock.symbol,
          series: stock.series,
          adjusted52WeekHigh: stock.adjusted52WeekHigh,
          adjusted52WeekLow: stock.adjusted52WeekLow,
          weekLowDate: stock.weekLowDate,
          weekHighDate: stock.weekHighDate
        };
        const result = await stocksModel.updateOne({
          symbol: save.symbol,
        }, save, {
          upsert: true,
        });
        return true;
      }
      return false;
    } catch(err) {
      console.error(`Could not save stock ${err}`);
      return false;
    }
}

async function getAllStocks(skip = 0, limit = 0) {
    return await stocksModel
    .find({}, { '_id': 0, '__v': 0 })
    .sort({})
    .skip(skip)
    .limit(limit);
}

async function getStockByName(name) {
  return await stocksModel
    .findOne({'symbol': name}, { '_id': 0, '__v': 0 });
}

async function deleteStock(symbol) {
  try {
    await stocksModel.deleteOne({
      symbol: symbol
    });
    return true;
  } catch {
      console.error(`Could not save stock ${err}`);
      return false;
  }
}

module.exports = {
    saveStock,
    loadStocksData,
    getAllStocks,
    getStockByName,
    deleteStock
};