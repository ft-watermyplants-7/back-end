const db = require('../../data/dbConfig');

const userSchema = require('./userSchema');

const checkCredentials = (req, res, next) => {
  if (req.body.username && req.body.password) {
    next();
  } else {
    next({status: 400, message: 'username and password are required'});
  }
}

const checkUsername = async (req, res, next) => {
  username = await db('users')
    .where('username', req.body.username)
    .first();
  if (username) {
    next({status: 400, message: 'username is taken'});
  } else {
    next();
  }
}

const checkPayload = async (req, res, next) => {
  try {
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();
    const validated = await userSchema.validate(
      req.body,
      {strict: true, stripUnknown: true}
    );
    req.body = validated;
    next();
  } catch (err) {
    next({status: 400, message: err.message});
  }
}

module.exports = {
  checkCredentials,
  checkUsername,
  checkPayload
}