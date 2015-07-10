var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: '127.0.0.1',
    port: 5432,
    user: '',
    password: '',
    database: 'apply',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);


/*********************************************************
  Status Schema
*********************************************************/

db.knex.schema.hasTable('status').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('status', function (status) {
      status.increments('id').primary();
      status.string('status');
    }).then(function (table) {

      /*********************************************************
        Notes Schema
      *********************************************************/

      db.knex.schema.hasTable('notes').then(function(exists){
        if(!exists){
          db.knex.schema.createTable('notes', function(notes){
            notes.increments('id').primary();
            notes.text('note');
          }).then(function(table){

            /*********************************************************
              Applications Schema
            *********************************************************/

            db.knex.schema.hasTable('applications').then(function(exists){
              if(!exists){
                db.knex.schema.createTable('applications', function(applications){
                  applications.string('company_name');
                  applications.integer('status_id').references('status.id');
                  applications.integer('notes_id').references('notes.id');
                });
              }
            });
          });
        }
      });
    });
  }
});

module.exports = db;
