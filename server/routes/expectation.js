'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const {handleErrors} = require('../lib/http-helper');

const router = express.Router(); // eslint-disable-line new-cap

router.use(bodyParser.json());

module.exports = (matcher) => {
  router.get('/', (req, res) => handleErrors(req, res, (req, res) => {
    res.send(matcher.getAll());
  }));

  router.post('/', (req, res) => handleErrors(req, res, (req, res) => {
    res.send(matcher.add(req.body));
  }));

  return router;
};
