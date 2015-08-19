var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  shell = require('gulp-shell'),
  livereload = require('gulp-livereload'),
  del = require('del');

var paths = {
  client_scripts: ['client/models/*.js', 'client/collections/*.js', 'client/views/**/*.js', 'client/scripts/*.js', 'client/router/router.js'],
  server_scripts: ['index.js', 'server/**/*.js'],
  all_scripts: ['index.js', 'server/**/*.js', 'gulpfile.js', 'client/models/*.js', 'client/collections/*.js', 'client/views/**/*.js', 'client/scripts/*.js', 'client/router/router.js'],
  templates: ['client/views/templates/*.handlebars'],
  dependencies: ['client/lib/jquery/dist/jquery.js', 'client/lib/underscore/underscore.js', 'client/lib/backbone/backbone.js']
}

gulp.task('jshint', function() {
  return gulp.src(paths.all_scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.client_scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/assets/js'));
});

gulp.task('dependencies', function() {
  return gulp.src(paths.dependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/assets/js'));
});

gulp.task('clean', function(cb) {
  del(['client/dist/assets/js/main.js', 'client/dist/assets/js/main.min.js'], cb)
});

gulp.task('precompile', shell.task('handlebars -m client/views/templates/> client/views/templates/templates.js'));

gulp.task('watch', function() {
  gulp.watch(paths.client_scripts, ['jshint', 'scripts']);
  gulp.watch(paths.server_scripts, ['jshint']);
  gulp.watch(paths.templates, ['precompile']);
});

gulp.task('default', ['jshint'], function() {
  gulp.start('scripts');
  gulp.start('precompile');
  gulp.start('watch');
});