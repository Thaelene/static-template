const APP_SRC    = 'src/';
const APP_DEST   = 'dist/';
const APP_ASSETS = 'dist/assets/';

module.exports = {
  bsServer: {
    server: {
      baseDir: './dist'
    },
    port: '8080',
    open: 'local'
  },

  fonts: {
    watchSrc: `${APP_SRC}fonts`,
    src: `${APP_SRC}fonts/**`,
    dest: `${APP_DEST}fonts`
  },

  favicons: {
    watchSrc: `${APP_SRC}favicons`,
    src: `${APP_SRC}favicons/**`,
    dest: `${APP_DEST}favicons`
  },

  images: {
    watchSrc: `${APP_SRC}images/**`,
    src: `${APP_SRC}images/**`,
    dest: `${APP_ASSETS}images`,
    opts: {
      gifsicle: { interlaced: true },
      jpegtran: { progressive: true },
      optipng: { optimizationLevel: 5 },
      svgo: {
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
      }
    }
  },

  scripts: {
    watchSrc: `${APP_SRC}javascript/**/*.js`,
    src: `${APP_SRC}javascript/main.js`,
    vendorSrc: APP_SRC + '/assets/scripts/vendors/*.js',
    dest: `${APP_ASSETS}javascript`
  },

  styles: {
    watchSrc: `${APP_SRC}styles/**/*.scss`,
    src: `${APP_SRC}styles/main.scss`,
    dest: `${APP_ASSETS}styles`,
    autoprefixerOpts: {
      browsers: ['last 2 versions', 'ie >= 10']
    }
  },

  views: {
    watchSrc: `${APP_SRC}views/**.html`,
    src: `${APP_SRC}views/index.html`,
    dest: `${APP_DEST}`
  }
};
