var gulp          = require('gulp');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var jshint        = require('gulp-jshint');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var gulpif        = require('gulp-if');

var scriptSrcs = [
  './src/js/main.js',
];

var enabled = {
  map: false,
};

/*================================================================
 # HELPER
 ================================================================*/

function handleError(err) {
  var msg = 'Error: ' + err.message;

  console.error('Error', err.message);
  browserSync.notify('Error: ' + err.message);

  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  if (typeof this.emit === 'function') this.emit('end')
}

/*================================================================
 # TASK
 ================================================================*/

gulp.task('style', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(gulpif(enabled.map, sourcemaps.init()))
    .pipe(sass({
      'sourceComments': false,
      'outputStyle': 'expanded'
    })).on('error', handleError)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(enabled.map, sourcemaps.write('.')))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream({
      'once': true
    }));
});

gulp.task('script', ['lint'], function() {
  return gulp.src(scriptSrcs)
    .pipe(gulpif(enabled.map, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(enabled.map, sourcemaps.write('.')))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream({
      'once': true
    }));
});

gulp.task('lint', function() {
  return gulp.src(scriptSrcs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve', function() {
  browserSync.init({
    'server': './',
    'open': true
  });

  gulp.watch('./src/sass/*.scss', ['style']);  
  gulp.watch('./src/js/*.js', { interval: 500 }).on('change', browserSync.reload);
  gulp.watch('./index.html', { interval: 500 }).on('change', browserSync.reload);
});

gulp.task('build', ['style']);
gulp.task('watch', ['serve']);
gulp.task('default', ['build']);
