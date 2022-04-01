const fs = require('fs');
const { parse } = require('csv-parse');
const { validate } = require('../models/stocks/stocks.mongo');

async function readCSV(filePath) {
    const stocks = [];
    return await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(parse({
              comment: '#',
              columns: true
          }))
          .on('data', async (data) => {
            if(data)
                stocks.push(data);
          })
          .on('err', (err) => {
              console.log(err);
              reject(err);
          })
          .on('end', async () => {
            console.log(`${stocks.length} stocks in ${filePath} found!`);
            resolve(stocks);
          });
    });
}

function validateStock(stock) {
    if(stock.symbol && stock.adjusted52WeekHigh && stock.adjusted52WeekLow &&
        stock.series && stock.weekHighDate && stock.weekLowDate)
        return validateDate(stock);
    else return null;
}

function validateDate(stock) {
    const re = new RegExp(/^(\d{1,2}-\w{3,4}-\d{1,2})$/);
    const weekLowDate = stock.weekLowDate;
    const weekHighDate = stock.weekHighDate;
    stock.weekHighDate = re.test(weekHighDate) ? weekHighDate : new Date(weekHighDate);
    stock.weekLowDate = re.test(weekLowDate) ? weekLowDate : new Date(weekLowDate);
    return stock;
}

module.exports = {
    readCSV,
    validateStock
}