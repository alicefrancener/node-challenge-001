const tableName = 'category';

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {name: 'microservices'},
        {name: 'productivity'},
      ]);
    });
};
