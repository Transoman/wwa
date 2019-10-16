module.exports = function () {
    $.gulp.task('files', () => {
        return $.gulp.src('./app/static/files/**/*.*')
            .pipe($.gulp.dest('./build/static/files/'));
    });
};