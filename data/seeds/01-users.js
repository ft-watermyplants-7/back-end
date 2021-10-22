const users = [{
  username: 'testUser',
  password: '$2a$08$.ZbLkKXHlwQfnGuxruSnyOxbZaSp4qvmII9W2w9SAh3XTSa7YGzKi'
}];

exports.users = users;

exports.seed = function (knex) {
  return knex('users').insert(users);
};
