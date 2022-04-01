const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {graphqlHTTP} = require('express-graphql');
const {loadFilesSync} = require('@graphql-tools/load-files');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const { routerV1 } = require('./routes/apiv1');

const app = express();
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});

// Middleware
//app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(morgan('combined'));
app.use(cors()); // can add origin here inside method {}
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // serve css and js

// Routes
app.use('/v1', routerV1);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = {
    app
};