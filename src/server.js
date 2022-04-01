const http = require('http');
const { app } = require('./app');
const { loadStocksData } = require('./models/stocks/stocks.model')
const { 
    mongoConnect
} = require('./services/mongo');

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

async function startServer() {
    // pre-loading
    await mongoConnect();
    await loadStocksData();
    console.log('Stocks loaded!');
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`)
    })
}

startServer();