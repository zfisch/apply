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
      t.string('email');
      t.string('password');
      t.timestamp('createdAt');
      t.timestamp('updatedAt');
    }).then(function(){

      /*********************************************************
        Company Schema
      *********************************************************/

      return db.knex.schema.createTable('company', function(t){
        t.increments('id').primary();
        t.string('companyName');
      });
    }).then(function(){

      /*********************************************************
        Contact Schema
      *********************************************************/

      return db.knex.schema.createTable('contact', function(t){
        t.increments('id').primary();
        t.integer('companyId').unsigned().references('company.id');
        t.string('contactName');
        t.string('contactEmail');
        t.string('contactPhone', 12)
      });
    }).then(function(){

      /*********************************************************
        Job Schema
      *********************************************************/

      return db.knex.schema.createTable('job', function(t){
        t.increments('id').primary();
        t.string('jobTitle');
        t.string('jobLocation');
        t.string('jobPosting');
      });
    }).then(function(){


      /*********************************************************
        Status Schema -- seeded with status options
      *********************************************************/

      return db.knex.schema.createTable('status', function(t){
        t.increments('id').primary();
        t.string('status');
      });
    }).then(function(){
      //Make sure to insert in the same order as options in applicationsTable.handlebars!
      return db.knex('status').insert([
        {status: 'Just applied'},
        {status: 'Followed up on initial application'},
        {status: 'Scheduled phone screen'},
        {status: 'Scheduled technical screen'},
        {status: 'Scheduled challenge'},
        {status: 'Scheduled onsite interview'},
        {status: 'Scheduled second onsite interview'},
        {status: 'Recieved offer'},
        {status: 'Made counter-offer'},
        {status: 'Accepted offer'},
        {status: 'Declined by company'},
        {status: 'Not interested in opportunity'}
      ]);
    }).then(function(){

      /*********************************************************
       Applications Schema
      *********************************************************/

      return db.knex.schema.createTable('application', function(t){
        t.increments('id').primary();
        t.integer('applicantId').unsigned().references('applicant.id');
        t.integer('statusId').unsigned().references('status.id');
        t.integer('companyId').unsigned().references('company.id');
        t.integer('jobId').unsigned().references('job.id');
        t.timestamp('createdAt');
        t.timestamp('updatedAt');
      });
    }).then(function(){

      /*********************************************************
        Notes Schema
      *********************************************************/

      return db.knex.schema.createTable('note', function(t){
        t.increments('id').primary();
        t.integer('applicationId').unsigned().references('application.id');
        t.text('note');
      });
    });
  }
});

module.exports = db;
