'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.use(bodyParser.json());

module.exports = (matcher) => {
  router.post('/', (req, res) => {
    try {
      res.send(matcher.add(req.body));
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.data);
      } else {
        res.status(500).send({
          message: err.message,
          stake: err.stack
        });
      }
    }
  });

  return router;
};
