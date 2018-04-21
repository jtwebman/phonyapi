'use strict';

const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

module.exports = (matcher) => {
  router.post('/', (req, res) => {
    try {
      matcher.clearIds(req.body);
      res.status(204).send();
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.data);
      } else {
        res.status(500).send(err);
      }
    }
  });

  router.post('/batch', (req, res) => {
    try {
      matcher.clearBatchIds(req.body);
      res.status(204).send();
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.data);
      } else {
        res.status(500).send(err);
      }
    }
  });

  return router;
};
