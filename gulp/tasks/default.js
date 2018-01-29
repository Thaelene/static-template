/* eslint-disable */
import gulp    from 'gulp'
import styles  from './styles'
import images  from './images'
import scripts from './scripts'
import views   from './views'
import copies  from './copies'
import server  from './server'
import watch   from './watch'
/* eslint-enable */

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('styles', 'images', 'scripts', 'views', 'copies'),
    done => {
      console.log('Production environment built');
      done();
    }
  )
);

gulp.task(
  'default',
  gulp.series('build', gulp.parallel('server', 'watch'), () => {})
);
