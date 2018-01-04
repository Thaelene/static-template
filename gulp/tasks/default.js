/* eslint-disable */
import gulp from 'gulp';
import styles from './styles';
import images from './images';
import scripts from './scripts';
/* eslint-enabled */

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel( styles, 'images', scripts),
    done => {
      console.log('Production environment built');
      done();
    }
  )
);