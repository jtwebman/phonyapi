'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3080;

const server = app.listen(PORT, () => {
  const service = server.address();
  if (service.address === '::') {
    service.address = 'localhost';
  }
  console.log(`Listening at http://${service.address}:${service.port}/`);
});

server.timeout = 600000; // 10 minutes

function gracefulShutdown(signal) {
  return () => {
    console.log(`${signal} received: Shutting down server`);
    server.close();
  };
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown('SIGTERM'));

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown('SIGINT'));
