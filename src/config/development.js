'use strict';

module.exports = {
  proto: 'http',
  backendDomain: 'localhost:3000',
  apiPath: '/api',
  port: 3000,
  host: '127.0.0.1',
  accessLogs: true,
  saltRounds: 10,
  db: {
    dialect: 'postgres'
  },
  auth: {
    tokenLifetimeSeconds: 10 * 60 * 60
  }
};
