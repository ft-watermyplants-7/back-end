
const plants = [
  {
    nickname: 'planty',
    species: 'plantis humongus',
    h2oFrequency: 24,
    user_id: 1
  },
  {
    nickname: 'planty2',
    species: 'plantis humonguser',
    h2oFrequency: 24,
    user_id: 1
  }
];

exports.plants = plants;

exports.seed = function (knex) {
  return knex('plants').insert(plants);
};
