exports.up = (knex) => {
  return knex.schema.createTable('authors', (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.text('picture').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('authors');
};
