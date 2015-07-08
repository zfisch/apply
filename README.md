# Apply
Job Application Tracking System

## Purpose

Looking for a job requires organization and pipeline management. Since I'm currently applying for jobs and practicing full-stack development, I decided to build a tool to manage my job applications through the pipeline.

Maybe you'd like to use it too? If so, read on.

## Usage

Apply is currently under construction -- please feel free to peruse the codebase, but it's currently dysfunctional.

## Requirements

- Node 0.12.x
- Postgresql 9.4.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Setting Up PostgreSQL ###
To run the app for development, PostgreSQL must be installed with the proper role set up. Follow the directions below to set up the DB.

#### If Postgres is not Installed ####
1. Install brew (http://brew.sh/)
2. Type command `brew update`
3. Type command `brew install postgres`

#### Run Postgres ####
1. Install Postgres.app http://postgresapp.com/
2. Open Postgres.app

#### Set Up Root DB Role ####
1. Type command `psql` to open the Postgres shell
2. Type command `CREATE ROLE root WITH LOGIN;`
3. Type command `ALTER ROLE root WITH SUPERUSER;`
4. Type command `ALTER ROLE root WITH CREATEROLE;`
5. Type command `ALTER ROLE root WITH CREATEDB;`
6. Type command `ALTER ROLE root WITH REPLICATION;`

#### Create mealplan database ####
Almost done! The app requires a database named "apply", so run the following:

```psql
CREATE DATABASE apply;
```