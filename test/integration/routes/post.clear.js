'use strict';

const {assert} = require('chai');
const request = require('supertest');

const app = require('../../../server/app');

describe('POST /clear', () => {
  it('can clear single expectation', () =>
    request(app)
    .post('/expectation')
    .set('Accept', 'application/json')
    .send({})
    .then((res) => {
      assert.equal(200, res.status, `Create status not OK: ${JSON.stringify(res, null, 2)}`);

      return request(app)
      .post('/clear')
      .set('Accept', 'application/json')
      .send(res.body.id);
    })
    .then((res) => {
      assert.equal(204, res.status, `Clear status not OK: ${JSON.stringify(res, null, 2)}`);
    })
  );

  it('can clear mutiple expectations', () =>
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

      return request(app)
      .post('/clear')
      .set('Accept', 'application/json')
      .send(res.body.matches.map((match) => match.id));
    })
    .then((res) => {
      assert.equal(204, res.status, `Clear status not OK: ${JSON.stringify(res, null, 2)}`);
    })
  );
});
