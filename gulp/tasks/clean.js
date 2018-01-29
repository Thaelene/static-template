/* eslint-disable */
import gulp from 'gulp'
import del  from 'del'
/* eslint-enable */

// Clean dist
const cleanTask = () => {
  return del(['dist']);
};

gulp.task('clean', cleanTask);

export default cleanTask;
