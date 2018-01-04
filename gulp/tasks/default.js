/* eslint-disable */
import gulp from 'gulp';
import stylesTask from './styles';
import imagesTask from './images';
import scriptTask from './scripts';
/* eslint-enabled */

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel( stylesTask, imagesTask, scriptTask),
    done => {
      console.log('Production environment built');
      done();
    }
  )
);