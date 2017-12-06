/* eslint-disable */
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulp_sass from 'gulp-sass';
import gulp_autoprefixer from 'gulp-autoprefixer';
import gulp_csscomb from 'gulp-csscomb';
import gulp_cssnano from 'gulp-cssnano';
import gulp_sourcemaps from 'gulp-sourcemaps';
import gulp_plumber from 'gulp-plumber';
import gulp_notify from 'gulp-notify';
import gulp_rename from 'gulp-rename';
import { styles } from '../config';
/* eslint-enabled */

const isProd = process.env.NODE_ENV === 'production';

const stylesTask = (done) => {
  gulp
    .src(styles.src)
    .pipe(gulp_plumber({
      errorHandler: gulp_notify.onError('SCSS Error: <%= error.message %>')
    }))
    .pipe(!isProd ? gulp_sourcemaps.init() : gutil.noop())
    .pipe(gulp_sass().on('error', gulp_sass.logError))
    .pipe(gulp_autoprefixer(styles.autoprefixerOpts))
    .pipe(gulp_csscomb())
    .pipe(gulp_cssnano())
    .pipe(!isProd ? gulp_sourcemaps.write() : gutil.noop())
    .pipe(gulp_rename('main.min.css'))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp_notify('SCSS compiled: <%= file.relative %>'));
  done();
}

gulp.task('styles', stylesTask);

export default stylesTask;
