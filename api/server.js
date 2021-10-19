const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  if (err.status) {
    res.status(err.status).json({
      message: err.message
    });
  } else {
    res.status(500).json({
      message: 'something went wrong'
      // message: err.message,
      // stack: err.stack
    });
  }
});

module.exports = server;
