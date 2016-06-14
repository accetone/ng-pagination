var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('minify', function() {
    return gulp.src('./src/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
    return gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-dist', ['minify', 'copy'], function() { });

gulp.task('build-demo', function() {
    return gulp.src([
            './src/*.js',
            './node_modules/angular/angular.min.js'
        ])
        .pipe(gulp.dest('./demo/js'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.js'], ['build-dist', 'build-demo']);
});