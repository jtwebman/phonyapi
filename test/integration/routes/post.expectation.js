'use strict';

const {assert} = require('chai');
const request = require('supertest');

const app = require('../../../server/app');

describe('POST /expectation', () => {
  it('can add single expectation', () =>
    request(app)
    .post('/expectation')
    .set('Accept', 'application/json')
    .send({})
    .then((res) => {
      assert.equal(200, res.status, `Status not OK: ${JSON.stringify(res, null, 2)}`);
      assert.isString(res.body.id);
      assert.isString(res.body.batchId);
    })
  );

  it('can add mutiple expectations', () =>
    request(app)
    .post('/expectation')
    .set('Accept', 'application/json')
    .send([
      {
        request: {
          path: '/test'
        },
        response: {
          status: 200,
          body: {
            status: 'OK'
          }
        }
      },
      {}
    ])
    .then((res) => {
      assert.equal(200, res.status, `Status not OK: ${JSON.stringify(res, null, 2)}`);
      assert.isString(res.body.batchId);
      assert.isArray(res.body.matches);
    })
  );
});
