// devDependencies
/* eslint-disable */
const gulp          = require('gulp'),

  // Tools
  del               = require('del'),
  gulp_rename       = require('gulp-rename'),
  gulp_plumber      = require('gulp-plumber'),
  gulp_sourcemaps   = require('gulp-sourcemaps'),
  gulp_notify       = require('gulp-notify'),
  gulp_browsersync  = require('browser-sync').create(),
  gulp_fileinclude  = require('gulp-file-include'),
  gutil         = require('gulp-util'),

  // CSS
  gulp_sass         = require('gulp-sass'),
  gulp_autoprefixer = require('gulp-autoprefixer'),
  gulp_cssnano      = require('gulp-cssnano'),

  //JS
  browserify        = require('browserify'),
  babelify          = require('babelify'),
  buffer            = require('vinyl-buffer'),
  source            = require('vinyl-source-stream'),
  es2015            = require('babel-preset-env'),
  gulp_uglify       = require('gulp-uglify'),

  // Images
  gulp_imagemin     = require('gulp-imagemin');

/* eslint-enable */

// Configuration
const config = {
  src: 'src/',
  dist: 'dist/',
  assets: 'dist/assets/',
  port: '3000',
  isProd: process.env.NODE_ENV === 'production'
}

// Browser sync and launch
function browserSync() {
  gulp_browsersync.init({
    server: `${config.dist}`,
    port: `${config.port}`,
    open: 'local'
  });
}

function gulpReload(done) {
  gulp_browsersync.reload();
  done();
}

// Clean dist
function clean() {
  return del(['dist']);
}

/************* GULP TASKS ************/

// Reunite several html files
function fileInclude() {
  return gulp
    .src(`${config.src}views/index.html`)
    .pipe(
      gulp_fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest(`${config.dist}`))
    .pipe(gulp_notify('HTML updated'));
}

// Styles function : SCSS into CSS, Sourcemaps, Autoprefix, Minify, Rename
function styles() {
  return gulp
    .src(`${config.src}styles/main.scss`)
    .pipe(gulp_plumber({
      errorHandler: gulp_notify.onError('SCSS Error: <%= error.message %>')
    }))
    .pipe(!config.isProd ? gulp_sourcemaps.init() : gutil.noop())
    .pipe(gulp_sass().on('error', gulp_sass.logError))
    .pipe(gulp_autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp_cssnano())
    .pipe(!config.isProd ? gulp_sourcemaps.write() : gutil.noop())
    .pipe(gulp_rename('main.min.css'))
    .pipe(gulp.dest(`${config.assets}styles`))
    .pipe(gulp_browsersync.stream())
    .pipe(gulp_notify('SCSS compiled: <%= file.relative %>'));
}

// Javascript function : Browserify, Concat, Sourcemaps, Uglify
function javascript() {
  return browserify(`${config.src}javascript/main.js`, { debug: true })
    .transform(babelify, { presets: [es2015] })
    .bundle()
    .on('error', gulp_notify.onError((error) => {
      return 'Message to the notifier: ' + error.message;
    }))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(!config.isProd ? gulp_sourcemaps.init() : gutil.noop())
    .pipe(gulp_uglify())
    .pipe(!config.isProd ? gulp_sourcemaps.write() : gutil.noop())
    .pipe(gulp_rename('main.min.js'))
    .pipe(gulp.dest(`${config.assets}javascript`))
    .pipe(gulp_browsersync.stream())
    .pipe(gulp_notify('JS compiled'));
}

// Move fonts to dist
function fonts() {
  return gulp
    .src(`${config.src}fonts/**`)
    .pipe(gulp.dest(`${config.assets}fonts`))
    .pipe(gulp_browsersync.stream());
}

// Move favicon to dist
function favicon() {
  return gulp
    .src(`${config.src}favicon/**`)
    .pipe(gulp.dest(`${config.dist}favicon`));
}

// Minimify images
function images() {
  return gulp
    .src(`${config.src}images/**`)
    .pipe(!config.isProd ? gulp_imagemin([
      gulp_imagemin.gifsicle({ interlaced: true }),
      gulp_imagemin.jpegtran({ progressive: true }),
      gulp_imagemin.optipng({ optimizationLevel: 5 }),
      gulp_imagemin.svgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
      })
    ]) : gutil.noop())
    .pipe(gulp.dest(`${config.assets}images`))
    .pipe(gulp_browsersync.stream())
    .pipe(gulp_notify('Image minified: <%= file.relative %>'));
}

// Watch files on change
/* eslint-disable */
function watch() {
  gulp.watch(`${config.src}styles/**/*.scss`,   gulp.series(styles, gulpReload))
  gulp.watch(`${config.src}javascript/**/*.js`, gulp.series(javascript, gulpReload))
  gulp.watch(`${config.src}views/**/**.html`,   gulp.series(fileInclude, gulpReload))
  gulp.watch(`${config.src}fonts/**`,           gulp.series(fonts, gulpReload))
  gulp.watch(`${config.src}favicon/**`,         gulp.series(favicon, gulpReload))
  gulp.watch(`${config.src}images/**`,          gulp.series(images, gulpReload))
}
/* eslint-enable */

/************* END GULP TASKS ************/

// Run GULP BUILT
gulp.task(
  'build',
  gulp.series(clean, gulp.parallel(fonts, styles, fileInclude, javascript, images, favicon), (done) => 
  {
    console.log('Production environment built')
    done();
  })
)

// Run GULP
gulp.task(
  'default',
  gulp.series('build', gulp.parallel(browserSync, watch), () => {})
)