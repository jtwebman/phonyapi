'use strict';

function ValidationError(message, status, issues, data) {
  this.message = message;
  this.status = status;
  this.issues = issues;
  this.data = data;
}

ValidationError.prototype = Error.prototype;

module.exports = ValidationError;
