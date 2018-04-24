'use strict';

const ValidationError = require('./validation-error');

function validateMatch(match) {
  const issues = [];
  if (match.times) {
    if (!Number.isInteger(match.times) || match.times <= 0) {
      issues.push('If times is passed it needs to be a postive integer.');
    }
  }

  if (issues.length > 0) {
    throw new ValidationError('Invalid match', 400, issues, match);
  }
}

module.exports = validateMatch;
