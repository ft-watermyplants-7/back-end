exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'testUser',
          password: '$2a$08$.ZbLkKXHlwQfnGuxruSnyOxbZaSp4qvmII9W2w9SAh3XTSa7YGzKi'
        }
      ]);
    });
}
