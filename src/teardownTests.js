const database = require('./database/index');

module.exports = async () => {
  await database.destroy();
};
