var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: '127.0.0.1',
    port: 5432,
    user: '',
    password: '',
    database: 'mealplan',
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
      console.log('Created Status Table', table);

      /*********************************************************
        Notes Schema
      *********************************************************/

      db.knex.schema.hasTable('notes').then(function(exists){
        if(!exists){
          db.knex.schema.createTable('notes', function(notes){
            notes.increments('id').primary();
            notes.text('note');
          }).then(function(table){
            console.log('Created Table', table);

            /*********************************************************
              Applications Schema
            *********************************************************/

            db.knex.schema.hasTable('applications').then(function(exists){
              if(!exists){
                db.knex.schema.createTable('applications', function(mealPlanRecipe){
                  application.string('company_name');
                  application.integer('status_id').references('status.id');
                  application.integer('notes_id').references('notes.id');
                }).then(function(table){
                  console.log('Created Table', table);
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