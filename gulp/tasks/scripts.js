/* eslint-disable */
import gulp            from 'gulp'
import gutil           from 'gulp-util'
import gulp_uglify     from 'gulp-uglify'
import browserSync     from 'browser-sync'
import gulp_sourcemaps from 'gulp-sourcemaps'
import gulp_notify     from 'gulp-notify'
import browserify      from 'browserify'
import babelify        from 'babelify'
import gulp_rename     from 'gulp-rename'
import source          from 'vinyl-source-stream'
import buffer          from 'vinyl-buffer'
import es2015          from 'babel-preset-env'
import { scripts }     from '../config'
/* eslint-enable */

const isProd = process.env.NODE_ENV === 'production';

const scriptsTask = () => {
  return browserify(scripts.src, { debug: true })
    .transform(babelify, { presets: [es2015] })
    .bundle()
    .on(
      'error',
      gulp_notify.onError(error => {
        return 'Message to the notifier: ' + error.message;
      })
    )
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(!isProd ? gulp_sourcemaps.init() : gutil.noop())
    .pipe(gulp_uglify())
    .pipe(!isProd ? gulp_sourcemaps.write() : gutil.noop())
    .pipe(gulp_rename('main.min.js'))
    .pipe(gulp.dest(scripts.dest))
    .pipe(browserSync.stream())
    .pipe(gulp_notify('JS compiled'));
};

gulp.task('scripts', scriptsTask);

export default scripts;
