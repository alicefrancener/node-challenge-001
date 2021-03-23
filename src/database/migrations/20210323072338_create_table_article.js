const tableName = 'article';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('title', 1000).notNullable();
    table.string('summary', 1000).notNullable();
    table.text('first_paragraph').notNullable();
    table.text('body').notNullable();
    table.timestamps(false, true);
    table.integer('author_id').unsigned().references('id').inTable('author').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('category_id').unsigned().references('id').inTable('category').onUpdate('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
