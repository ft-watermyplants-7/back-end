const db = require('../../data/dbConfig');

module.exports = {
  addPlant(plant) {
    return db('plants').insert(plant)
      .then(() => {
        return {message: 'plant successfully added'}
      });
  }
}