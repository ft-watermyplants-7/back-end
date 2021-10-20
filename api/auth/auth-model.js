const db = require('../../data/dbConfig');

module.exports = {
  async add(user) {
    return await db('users').insert(user)
      .then(() => {
        return db('users').where('username', user.username).first();
      });
  },
  getById(id) {
    return db('users').where('user_id', id).first();
  },
  update(user, id) {
    return db('users').where('user_id', id).update(user)
      .then(async res => {
        return await this.getById(id);
    });
  }
}
