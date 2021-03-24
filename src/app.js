const express = require('express');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const api = require('./routers/index');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(process.env.PORT || '3333');
