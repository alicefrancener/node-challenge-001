const express = require('express');
const helmet = require('helmet');

const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const api = require('./routers/index');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api', api);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
