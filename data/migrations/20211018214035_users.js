
exports.up = function(knex) {
  return knex.schema
    .createTable('users', u => {
      u.increments('user_id');
      u.string('username', 128).notNullable().unique();
      u.string('password', 128).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
