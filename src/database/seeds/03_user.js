const tableName = 'user';

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {email: 'example01@example.com', password: 'pass123'},
        {email: 'example02@example.com', password: 'pass123', is_admin: true},
      ]);
    });
};
