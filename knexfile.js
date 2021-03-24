require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER
    },
    migrations: {
      directory: './src/database/migrations/'
    },
    seeds: {
      directory: './src/database/seeds/'
    }
  }
};
