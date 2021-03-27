const bcrypt = require('bcrypt');

const tableName = 'user';

exports.seed = async (knex) => {
  const hashedPass = await bcrypt.hash('pass123PASS', 12);
  await knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {email: 'admin@example.com', password: hashedPass, is_admin: true},
        {email: 'user@example.com', password: hashedPass}
      ]);
    });
};
