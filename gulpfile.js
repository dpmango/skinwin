// DECLARE VARIABLES
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var sourcemaps    = require('gulp-sourcemaps');
var pug           = require('gulp-pug');
var postcss       = require('gulp-postcss');
var babel         = require('gulp-babel');
var autoprefixer  = require('autoprefixer');
var assets        = require('postcss-assets');
var sugarss       = require('sugarss');
var precss        = require('precss');
var sorting       = require('postcss-sorting');
var cssnext       = require('postcss-cssnext');
var short         = require('postcss-short');
var svginline     = require('postcss-inline-svg');
var colorFunction = require("postcss-color-function");
var mqpacker      = require('css-mqpacker');
var pixrem        = require('pixrem');
var rgba_fallback = require('postcss-color-rgba-fallback');
var opacity       = require('postcss-opacity');
var pseudoel      = require('postcss-pseudoelements');
var vmin          = require('postcss-vmin');
var will_change   = require('postcss-will-change');
var flexbugs      = require('postcss-flexbugs-fixes');
var cssnano       = require('cssnano');
var less          = require('gulp-less');
var path          = require('path');
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync').create();


// Default task
gulp.task('default', function (callback) {
  runSequence(['less', 'browserSync'], 'watch',
    callback
  )
})

// Watch
gulp.task('watch', function(){
  // uncomment to use with less
  gulp.watch('./src/less/**/*.less', ['less']);
  // gulp.watch('./src/pcss/**/*.+(sss|css)', ['postcss']);
  // gulp.watch('./src/views/**/*.pug', ['pug']);
  gulp.watch('./src/*.html', browserSync.reload);
  gulp.watch('./src/js/es2015/*.js', ['babel']);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
})

// Build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'less',
    ['useref', 'images'],
    'cssnano',
    callback
  )
})

/////
// DEVELOPMENT TASKS
/////

var processors = [
    precss(),
    short(),
    colorFunction(),
    svginline(),
    assets({
      loadPaths: ['src/images/']
    }),
    autoprefixer({browsers: ['last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    sorting(),
    pixrem(),
    will_change(),
    rgba_fallback(),
    opacity(),
    pseudoel(),
    vmin(),
    flexbugs()
    // mqpacker(),
];

gulp.task('less', function () {
  return gulp.src('./src/less/style.less')
    .pipe( sourcemaps.init() )
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// gulp.task('pug', function buildHTML() {
//   return gulp.src('./src/views/*.pug')
//       .pipe(pug({
//         pretty: true
//       }))
//       .pipe( gulp.dest('./src/') )
//       .pipe(browserSync.reload({
//         stream: true
//       }));
// });

/////
// OPTIMIZATION TASKS
/////

gulp.task('useref', function(){
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('cssnano', function () {
  return gulp.src('./dist/css/styles.css')
    .pipe( postcss([cssnano({
      autoprefixer: false,
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    })]) )
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css'));;
});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

// hot reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})
