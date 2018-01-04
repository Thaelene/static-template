/* eslint-disable */
import gulp from 'gulp';
import gulp_notify from 'gulp-notify';
import gulp_fileinclude from 'gulp-file-include';
import { views } from '../config';
/* eslint-enable */

const viewsTask = (done) => {
  gulp
    .src(views.src)
    .pipe(
      gulp_fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest(views.dest))
    .pipe(gulp_notify('HTML updated'));
  done();
};

gulp.task('views', viewsTask);

export default viewsTask;
