const gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require("gulp-postcss"),
  autoprefixer = require('autoprefixer'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

// 
gulp.task('dev', function () {
  // postcss 配置
  let plugins = [
    autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0', 'IE >= 9']
    })
  ];
  // js
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));

  // css
  gulp.src('src/style/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('assets/style/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./index.html').on('change', browserSync.reload);
});


watcher = gulp.watch(['src/js/*.js', 'src/style/*.scss'], ['dev']);

watcher.on('change', function (event) {
  console.log('Event type: ' + event.type); // added, changed, or deleted
  console.log('Event path: ' + event.path); // The path of the modified file
});


gulp.task('default', ['server']);