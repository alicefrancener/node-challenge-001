const tableName = 'category';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('name', 127).notNullable().unique();
    table.timestamps(false, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
