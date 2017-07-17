var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('clean', function() {
    del('dist');
});

gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(concat('MiradorSyncWindows.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('stylesheets', function() {
    return gulp.src('src/*.css')
        .pipe(cleanCSS())
        .pipe(concat('MiradorSyncWindows.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts', 'stylesheets']);
