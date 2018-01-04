/* eslint-disable */
import gulp from 'gulp';
import { fonts } from '../config';
import { favicons } from '../config';
/* eslint-enabled*/

const copyFontsTask = (done) => {
  gulp
    .src(fonts.src)
    .pipe(gulp.dest(fonts.dest))
  done()
};

const copyFaviconsTask = (done) => {
  gulp
    .src(favicons.src)
    .pipe(gulp.dest(favicons.dest))
  done()
};

gulp.task('copies', gulp.parallel(copyFontsTask, copyFaviconsTask));

export default fonts;