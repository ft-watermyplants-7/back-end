
exports.up = function(knex) {
  return knex.schema
    .table('users', u => {
      u.string('email', 128).unique()
    })
    .createTable('plants', p => {
      p.increments('plant_id');
      p.string('nickname', 128).notNullable();
      p.string('species', 128).notNullable();
      p.float('h2oFrequency', 8).notNullable();
      p.binary('image');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users');
};
