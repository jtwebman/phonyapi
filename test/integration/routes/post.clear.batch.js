'use strict';

const {assert} = require('chai');
const request = require('supertest');

const app = require('../../../server/app');

describe('POST /clear/batch', () => {
  it('can clear single batch of expectations', () =>
    request(app)
    .post('/expectation')
    .set('Accept', 'application/json')
    .send({})
    .then((res) => {
      assert.equal(200, res.status, `Create status not OK: ${JSON.stringify(res, null, 2)}`);

      return request(app)
      .post('/clear/batch')
      .set('Accept', 'application/json')
      .send(res.body.batchId);
    })
    .then((res) => {
      assert.equal(204, res.status, `Clear status not OK: ${JSON.stringify(res, null, 2)}`);
    })
  );

  it('can clear mutiple expectations', () => {
    const batches = [];

    return request(app)
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
      assert.equal(200, res.status, `First create status not OK: ${JSON.stringify(res, null, 2)}`);
      batches.push(res.body.batchId);

      return request(app)
      .post('/expectation')
      .set('Accept', 'application/json')
      .send([
        {
          request: {
            path: '/test2'
          },
          response: {
            status: 200,
            body: {
              status: 'OK'
            }
          }
        },
        {}
      ]);
    })
    .then((res) => {
      assert.equal(200, res.status, `Second create status not OK: ${JSON.stringify(res, null, 2)}`);
      batches.push(res.body.batchId);

      return request(app)
      .post('/clear/batch')
      .set('Accept', 'application/json')
      .send(batches);
    })
    .then((res) => {
      assert.equal(204, res.status, `Clear status not OK: ${JSON.stringify(res, null, 2)}`);
    });
  });
});
