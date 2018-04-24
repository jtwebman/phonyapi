'use strict';

const uuidv4 = require('uuid/v4');
const {find} = require('lodash');

const validateMatch = require('./validate-match');

const store = {
  matchers: []
};

function getAll() {
  return store.matchers;
}

function addSingle(batchId, match) {
  const newMatch = Object.assign({}, match, {
    id: uuidv4(),
    batchId
  });
  validateMatch(newMatch);
  store.matchers.unshift(newMatch);
  return newMatch;
}

function add(matches) {
  const batchId = uuidv4();
  if (Array.isArray(matches)) {
    return {
      batchId,
      matches: matches.map((match) => addSingle(batchId, match))
    };
  }
  return addSingle(batchId, matches);
}

function clearIds(ids) {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  store.matchers = store.matchers.reduce((remaining, match) => {
    if (!find(ids, (id) => match.id === id)) {
      remaining.push(match);
    }
    return remaining;
  }, []);
}

function clearBatchIds(batchIds) {
  if (!Array.isArray(batchIds)) {
    batchIds = [batchIds];
  }
  store.matchers = store.matchers.reduce((remaining, match) => {
    if (!find(batchIds, (batchId) => match.batchId === batchId)) {
      remaining.push(match);
    }
    return remaining;
  }, []);
}

function reset() {
  store.matchers = [];
}

module.exports = {
  add,
  clearIds,
  clearBatchIds,
  getAll,
  reset
};
