var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

//pug file to HTMLs
gulp.task('htmls', function() {
    return gulp.src('app/html/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

//Cleaning up generated files automatically
gulp.task('clean:dist', function() {
    return del.sync('dist/');
})


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        // .pipe(useref())
        .pipe(browserSync.stream());
});


//Copying Fonts to Dist
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})


// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/echarts/dist/echarts.min.js', 'app/scripts/*.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});


// Gulp watch syntax
gulp.task('watch', ['htmls', 'sass', 'js', 'fonts'], function() {
    gulp.watch('app/**/*.html', ['htmls']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/scripts/*.js', ['js']);

    //Reloads the browser whenever HTML or JS files change
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
});

gulp.task('default', ['watch', 'htmls', 'browserSync', 'clean:dist', 'js', 'sass', 'fonts']);