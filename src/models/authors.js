const { Model } = require('objection');

const connection = require('./../database/');

Model.knex(connection);

class Author extends Model {
  static get tableName() {
    return 'author';
  }
}

module.exports = Author;
