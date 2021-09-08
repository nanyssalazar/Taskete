const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send({ status: 200, message: 'CONNECTED!' });
});

module.exports = routes;
