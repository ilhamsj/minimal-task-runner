// Definisi plug-in atau modul;
var gulp            = require('gulp');
var gulpConnect     = require('gulp-connect');
var gulpMinifyCss   = require('gulp-minify-css');
var gulpConcat      = require('gulp-concat');
var gulpUglify      = require('gulp-uglify');
var gulpHtmlmin     = require('gulp-htmlmin');
var clean           = require('gulp-clean');

// Definisi Task
gulp.task('sayHello', async function() {
    console.log('hello, selamat datang di gulp');
});

// Membuat server
gulp.task('server', function() {
    gulpConnect.server({
        root: "dist",
        livereload: true
    });
});

// Task untuk modul minify CSS
gulp.task('minify-css', async function() {
    gulp.src('./src/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpConnect.reload());
});

// Task untuk modul minify JS
gulp.task('minify-js', async function() {
    gulp
        .src([
            './src/js/*.js'
        ])
        .pipe(gulpConcat('app.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(gulpConnect.reload());

});

// Task untuk modul minify html
gulp.task('minify-html', async function () {
    gulp.src('src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

// menampilkan langsung perubahan yang terjadi pada file
gulp.task('watch', async function() {
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/css/*.css', gulp.series('minify-css'));
    gulp.watch('./src/*.html', gulp.series('minify-html'));
});

// menjalankan server sekaligu menampilkan langsung perubahan yg terjadi pada file
gulp.task('default', gulp.series('watch', 'server'));

// Clean the dist
gulp.task('clean', function() {
    return gulp.src('dist', {
      read: false,
      allowEmpty: true
    }).pipe(clean());
  });

// Build task with clean the dist
gulp.task('build', gulp.series('clean', 'minify-css', 'minify-js', 'minify-html'));


