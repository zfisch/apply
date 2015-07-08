var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: '127.0.0.1',
    port: 3000,
    user: '',
    password: '',
    database: 'apply',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

module.exports = db;