var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./public/src/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('serve', ['styles'], function() {
    browserSync.init({
        proxy: 'http://localhost:3000'
    });

    gulp.watch('public/**/*.scss', ['styles']);
    gulp.watch('build/*.js').on('change', browserSync.reload);
    gulp.watch('build/*.css').on('change', browserSync.reload);
});

gulp.task('styles', function () {
        return gulp.src('./public/stylesheets/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['browserify', 'serve']);
