const database = require('./database/index');

module.exports = async () => {
  await database.migrate.rollback();
  await database.migrate.latest();
  await database.seed.run();
};
