var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        port: 9003,
        server: {
            baseDir: './'
        }
    })

    gulp.watch([
        '*.html',
        '**/**/*.html',
        '**/*.css',
        '**/*.js'
    ]).on('change', reload);
});

gulp.task('default', ['serve']);