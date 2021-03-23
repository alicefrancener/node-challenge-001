const express = require('express');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const app = express();

app.use(helmet());
app.use(express.json());


app.get('/', (req,res) => {
  res.send('Hello World!');
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(process.env.PORT || '3333');
