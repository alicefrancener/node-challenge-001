const { Model } = require('objection');

const connection = require('./../database/');

Model.knex(connection);

class Article extends Model {
  static get tableName() {
    return 'article';
  }
}

module.exports = Article;
