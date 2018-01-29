/* eslint-disable */
import gulp         from 'gulp'
import browserSync  from 'browser-sync'
import { fonts }    from '../config'
import { favicons } from '../config'
/* eslint-enable */

const copyFontsTask = (done) => {
  gulp
    .src(fonts.src)
    .pipe(gulp.dest(fonts.dest))
    .pipe(browserSync.stream());
  done();
};

const copyFaviconsTask = (done) => {
  gulp
    .src(favicons.src)
    .pipe(gulp.dest(favicons.dest))
    .pipe(browserSync.stream());
  done();
};

gulp.task('copies', gulp.parallel(copyFontsTask, copyFaviconsTask));

export default { fonts, favicons };
