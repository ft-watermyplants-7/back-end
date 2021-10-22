const db = require('../../data/dbConfig');
const { update } = require('../auth/auth-model');

module.exports = {
  addPlant(plant) {
    return db('plants').insert(plant)
      .then(() => {
        return {message: 'plant successfully added'}
      });
  },
  getPlants(id) {
    return db('plants').where('user_id', id);
  },
  update(plant_id, plant) {
    return db('plants').where('plant_id', plant_id)
      .update(plant);
  },
  delete(id) {
    return db('plants').where('plant_id', id).delete();
  }
}
