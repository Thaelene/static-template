import gulp from 'gulp';
import gutil from 'gulp-util';
import gulp_imagemin from 'gulp-imagemin';
import { images } from '../config';
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
    .pipe(gulp.dest(images.dest));
  done();
};

gulp.task('images', imagesTask);

export default imagesTask;
