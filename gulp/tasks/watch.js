/* eslint-disable */
import gulp from 'gulp';
import browserSync from 'browser-sync';
const bs = browserSync.create();
import {
  fonts,
  favicons,
  images,
  scripts,
  styles,
  views
} from '../config';

/* eslint-enabled */

function reload(done){
  bs.reload()
  done()
};

const watchTask = () => { 
    gulp.watch(fonts.src, gulp.series('copies', reload));
    gulp.watch(favicons.src, gulp.series('copies', reload));
    gulp.watch(images.src, gulp.series('images', reload));
    gulp.watch(scripts.watchSrc, gulp.series('scripts', reload));
    gulp.watch(styles.watchSrc, gulp.series('styles', reload));
    gulp.watch(views.watchSrc, gulp.series('views', reload));
};

gulp.task('watch', watchTask);

