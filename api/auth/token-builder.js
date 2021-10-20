const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../secrets');

module.exports = function(user) {
  const payload = {
    user_id: user.user_id,
    username: user.username
  };
  const options = {
    expiresIn: '7d'
  };
  const token = jwt.sign(
    payload,
    JWT_SECRET,
    options
  );
  return token;
};
