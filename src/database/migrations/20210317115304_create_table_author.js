const tableName = 'author';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('name').notNullable().unique();
    table.string('picture', 2000).notNullable();
    table.timestamps(false, true);
  });

};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
