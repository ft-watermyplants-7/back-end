const db = require('../../data/dbConfig');

const checkCredentials = (req, res, next) => {
  if (req.body.username && req.body.password) {
    next();
  } else {
    next({status: 401, message: 'username and password are required'});
  }
}

module.exports = {
  checkCredentials
}