var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js', 'server/**/*.js', 'index.js', 'client/collections/*.js', 'client/models/*.js', 'client/views/**/*.js', 'client/scripts/*.js', 'client/router/router.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  return gulp.src(['client/collections/*.js', 'client/models/*.js', 'client/views/**/*.js', 'client/router/router.js', 'client/scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('dependencies', function() {
  return gulp.src(['client/lib/jquery/dist/jquery.js', 'client/lib/underscore/underscore.js', 'client/lib/backbone/backbone.js'])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['client/dist/assets/js/main.js', 'client/dist/assets/js/main.min.js'], cb)
});

gulp.task('default', ['clean', 'jshint'], function() {
    gulp.start('scripts');
});
