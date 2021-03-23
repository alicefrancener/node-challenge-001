const tableName = 'author';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('name').notNullable().unique();
    table.text('picture').notNullable();
    table.timestamps(false, true);
  });

};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
