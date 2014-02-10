var gulp = require('gulp');
var browserify = require('gulp-browserify');

function buildJs() {
    return gulp.src('src/main.js')
        .pipe(
            browserify({
                output: 'main.min.js'
            })
        )
        .pipe(
            gulp.dest('build')
        );
}

gulp.task('default', buildJs);
var watcher = gulp.watch('src/**/*.js', ['default']);
