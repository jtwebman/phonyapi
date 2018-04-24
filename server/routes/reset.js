'use strict';

const express = require('express');

const {handleErrors} = require('../lib/http-helper');

const router = express.Router(); // eslint-disable-line new-cap

module.exports = (matcher) => {
  router.post('/', (req, res) => handleErrors(req, res, (req, res) => {
    matcher.reset();
    res.status(204).send();
  }));

  return router;
};
