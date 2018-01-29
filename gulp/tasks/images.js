/* eslint-disable */
import gulp            from 'gulp'
import gutil           from 'gulp-util'
import gulp_imagemin   from 'gulp-imagemin'
import gulp_responsive from 'gulp-responsive-images'
import browserSync     from 'browser-sync'
import { images }      from '../config'
/* eslint-enable */

const isProd = process.env.NODE_ENV === 'production';

const imagesTask = (done) => {
  gulp
    .src(images.src)
    .pipe(!isProd ? gulp_imagemin([
      gulp_imagemin.gifsicle(images.opts.gifsicle),
      gulp_imagemin.jpegtran(images.opts.jpegtran),
      gulp_imagemin.optipng(images.opts.optipng),
      gulp_imagemin.svgo(images.opts.svgo)
    ]) : gutil.noop())
    .pipe(gulp.dest(images.dest))
    .pipe(browserSync.stream());
  done();
};

const resizeTask = (done) => {
  gulp
    .src(images.src)
    .pipe(
      gulp_responsive(
        {
          '*': [
            { width: 350, rename: { suffix: '@350w' } },
            { width: 560, rename: { suffix: '@560w' } },
            { width: 720, rename: { suffix: '@720w' } },
            { width: 1280, rename: { suffix: '@1280w' } },
            { width: 1920, rename: { suffix: '@1920w' } },
            { rename: { suffix: '-full' } }
          ]
        },
        {
          quality: 70,
          progressive: true,
          withMetadata: false
        }
      )
    )
    .pipe(gulp.dest(images.dest))
    .pipe(browserSync.stream());
  done();
};

gulp.task('images', gulp.parallel(imagesTask, resizeTask));

export default images;

