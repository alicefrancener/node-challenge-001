const { Model } = require('objection');

const connection = require('./../database/');

Model.knex(connection);

class User extends Model {
  static get tableName() {
    return 'user';
  }
}

module.exports = User;
