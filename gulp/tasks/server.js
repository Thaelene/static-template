/* eslint-disable */
import gulp from 'gulp'
import browserSync from 'browser-sync'
const server = browserSync.create()

/* eslint-enable */

const serverTask = (done) => {
  server.init({
    server: {
      baseDir: './dist/'
    },
    port: '8080',
    open: 'local'
  }, done());
};

gulp.task('server', serverTask);

export default server;
