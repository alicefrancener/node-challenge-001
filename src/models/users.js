const { Model } = require('objection');

const connection = require('./../database/');

Model.knex(connection);

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255, pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'},
        password: { type: 'string', minLength: 8, maxLength: 100},
        created_at: { type: 'string'},
        updated_at: { type: 'string'}
      },
      required: ['email', 'password'],
      additionalPropertires: false,
    };
  }
}

module.exports = User;
