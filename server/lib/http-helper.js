'use strict';

function handleErrors(req, res, actionFunc) {
  try {
    actionFunc(req, res);
  } catch (err) {
    if (err.status) {
      res.status(err.status).send({
        message: err.message,
        issues: err.issues,
        data: err.data
      });
    } else {
      res.status(500).send(err.message);
    }
  }
}

module.exports = {
  handleErrors
};
