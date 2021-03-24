const tableName = 'user';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('email').notNullable().unique();
    table.string('password', 100).notNullable();
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.timestamps(false, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
