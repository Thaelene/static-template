const APP_SRC = 'src/';
const APP_DEST = 'dist/';
const APP_ASSETS = 'dist/assets/';

module.exports = {
  appSrc: APP_SRC,
  appDest: APP_DEST,

//   bsServer: {
//     //proxy: 'your-proxy.dev'
//     server: {
//       baseDir: "./build"
//     }
//   },

//   fonts: {
//     src: APP_SRC + "/assets/fonts/*",
//     dest: APP_DEST + "/fonts/"
//   },

  images: {
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

//   scripts: {
//     watchSrc: APP_SRC + "/assets/scripts/**/*.js",
//     src: APP_SRC + "/assets/scripts/app.js",
//     vendorSrc: APP_SRC + "/assets/scripts/vendors/*.js",
//     dest: APP_DEST + "/js/"
//   },

//   styles: {
//     watchSrc: APP_SRC + "/assets/styles/**/*.scss",
//     src: APP_SRC + "/assets/styles/app.scss",
//     dest: APP_DEST + "/css/",
//     autoprefixerOpts: {
//       browsers: ["last 2 versions", "ie >= 10"]
//     }
//   },

//   views: {
//     watchSrc: APP_SRC + "/views/**/*.*",
//     src: APP_SRC + "/views/**/*.*",
//     dest: APP_DEST
//   }
};
