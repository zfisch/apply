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

//Check if tables exist before creating. If applicant table exists, all tables exist.
db.knex.schema.hasTable('applicant').then(function(exists){
  if(!exists){

    /*********************************************************
      Applicant Schema
    *********************************************************/

    return db.knex.schema.createTable('applicant', function(t){
      t.increments('id').primary();
      t.string('username');
      t.string('password');
    }).then(function(){

      /*********************************************************
        Company Schema
      *********************************************************/

      return db.knex.schema.createTable('company', function(t){
        t.increments('id').primary();
        t.string('company_name');
        t.string('address');
        t.string('phone', 12)
      });
    }).then(function(){

      /*********************************************************
        Contact Schema
      *********************************************************/

      return db.knex.schema.createTable('contact', function(t){
        t.increments('id').primary();
        t.integer('company_id').unsigned().references('company.id');
        t.string('name');
        t.string('email');
        t.string('phone', 12)
      });
    }).then(function(){

      /*********************************************************
        Job Schema
      *********************************************************/

      return db.knex.schema.createTable('job', function(t){
        t.increments('id').primary();
        t.string('job_title');
        t.string('link');
      });
    }).then(function(){


      /*********************************************************
        Status Schema
      *********************************************************/

      return db.knex.schema.createTable('status', function(t){
        t.increments('id').primary();
        t.string('status');
      });
    }).then(function(){

      /*********************************************************
       Applications Schema
      *********************************************************/

      return db.knex.schema.createTable('application', function(t){
        t.increments('id').primary();
        t.integer('applicant_id').unsigned().references('applicant.id');
        t.integer('status_id').unsigned().references('status.id');
        t.integer('company_id').unsigned().references('company.id');
        t.integer('job_id').unsigned().references('job.id');
        t.timestamp('last_action');
      });
    }).then(function(){

      /*********************************************************
        Notes Schema
      *********************************************************/

      return db.knex.schema.createTable('note', function(t){
        t.increments('id').primary();
        t.integer('application_id').unsigned().references('application.id');
        t.text('note');
      });
    });
  }
});

module.exports = db;
