const { Model } = require('objection');

const connection = require('./../database/');

Model.knex(connection);

class Author extends Model {
  static get tableName() {
    return 'author';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 2, maxLength: 255},
        picture: { type: 'string', maxLength: 2000},
        created_at: { type: 'string'},
        updated_at: { type: 'string'}
      },
      required: ['name', 'picture'],
      additionalPropertires: false,
    };
  }
}

module.exports = Author;
