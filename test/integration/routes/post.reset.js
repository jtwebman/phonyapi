'use strict';

const {assert} = require('chai');
const request = require('supertest');

const app = require('../../../server/app');

describe('POST /reset', () => {
  it('can reset all expectations', () =>
    request(app)
    .post('/expectation')
    .set('Accept', 'application/json')
    .send({})
    .then((res) => {
      assert.equal(200, res.status, `Create status not OK: ${JSON.stringify(res, null, 2)}`);

      return request(app)
      .post('/reset')
      .set('Accept', 'application/json')
      .send();
    })
    .then((res) => {
      assert.equal(204, res.status, `Clear status not OK: ${JSON.stringify(res, null, 2)}`);

      return request(app)
      .get('/expectation')
      .set('Accept', 'application/json')
      .send();
    })
    .then((res) => {
      assert.equal(200, res.status, `Fetch all status not OK: ${JSON.stringify(res, null, 2)}`);
      assert.isArray(res.body);
      assert.equal(res.body.length, 0);
    })
  );
});
