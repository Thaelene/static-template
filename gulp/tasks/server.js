/* eslint-disable */
import gulp from 'gulp';
import browserSync from 'browser-sync';
const bs = browserSync.create();

/* eslint-enabled */

const serverTask = (done) => {
  bs.init({ 
    server: {
      baseDir: "./dist/"
    },
    port: '8080', 
    open: 'local' 
  });
  done()
};

gulp.task('server', serverTask);

