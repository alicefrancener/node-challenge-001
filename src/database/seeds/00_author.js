const tableName = 'author';

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {name: 'Martin Fowler', picture: 'https://martinfowler.com/mf.jpg'},
        {name: 'Tania Rascia', picture: 'https://www.taniarascia.com/static/tania2020small-2e26928e592931dfb9698970daff8edc.jpg'},
      ]);
    });
};
