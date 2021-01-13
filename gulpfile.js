'use strict';
const gulp = require('gulp');

// UTILS
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const wait = require('gulp-wait');

// CSS
const cleanCSS = require('gulp-clean-css');

// SCSS
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

// JS
const order = require('gulp-order');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');


// livereloading
const browserSync = require('browser-sync').create();


// ===============================
// GLOBAL OPTIONS
// ===============================
const options = {
  minify: {
    noSource: true,
    ext: {
      min: '.js'
    }
  },
  uglify: {
    mangle: false,
    ie8: true,
    safari10: true
  },
  babel: {
    presets: ['@babel/env']
  },
  scss: {
    outputStyle: 'compressed',
    includePaths: ['node_modules']
  },
  cleancss: {
    compatibility: 'ie8'
  }
}

// ===============================
// REUSABLE FUNCTIONS
// ===============================
const jsErrHandler = (err) => {
  gutil.log(gutil.colors.red('[Error]'), err.toString());
  console.error(err.message);
  this.emit('end');
}

const jsDependency = (
  sync
  , source
  , dest
  , filename = 'bundledependency.js') => {

  const proc  = gulp.src(source).pipe(order([
      'jquery.min.js',
      'priority/**/*.js',
      'common/**/*.js'
    ]))
    .pipe(minify(options.minify))
    .on('error', (err) => {jsErrHandler(err)})
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}

const jsProject = (
  sync
  , source
  , dest
  , filename = 'bundleproject.js') => {

  const proc = gulp.src(source).pipe(babel(options.babel))
    .pipe(uglify(options.uglify))
    .on('error', (err) => {jsErrHandler(err)})
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));
  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }
  return proc
}

const scss = (
  sync
  , source
  , dest ) => {

  const plugins = [
      autoprefixer() ,
      cssnano({
        zindex: false,
        reduceIdents: false
      })
  ];

  const proc = gulp.src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(wait(200))
    .pipe(sass(options.sass)) // Using gulp-sass
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}

const css = (
  sync
  , source
  , dest
  , filename = 'bundlecss.css') => {

  const proc =  gulp.src(source)
    .pipe(cleanCSS(options.cleancss))
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    port: '1234'
  })
});


gulp.task('css', () => { css(true, 'src/css/**/*.css','app/css') });
gulp.task('scss', () => { scss(true, 'src/scss/**/*.scss','app/css') });
gulp.task('js-dependency', () => { jsDependency(true, 'src/js/dependency/**/*.js','app/js') });
gulp.task('js-project', () => { jsProject(true, 'src/js/project/**/*.js','app/js') });
gulp.task('default', [
  'browserSync'
  , 'css'
  , 'scss'
  , 'js-dependency'
  , 'js-project']
  , function(){
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/dependency/**/*.js', ['js-dependency']);
  gulp.watch('src/js/project/**/*.js', ['js-project']);
  gulp.watch('app/**/*.html', browserSync.reload);
});












