'use strict';

const express = require('express');

const clear = require('./routes/clear');
const expectation = require('./routes/expectation');
const matcher = require('./lib/matcher');

const app = express();

const clearRoute = process.env.CLEAR_ROUTE || '/clear';
const expectationRoute = process.env.EXPECTATION_ROUTE || '/expectation';

app.disable('x-powered-by');
app.disable('etag');

app.use(clearRoute, clear(matcher));
app.use(expectationRoute, expectation(matcher));

module.exports = app;
