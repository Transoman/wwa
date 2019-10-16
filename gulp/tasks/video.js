module.exports = function () {
  $.gulp.task('video', () => {
    return $.gulp.src('./app/static/images/**/*.mp4')
      .pipe($.gulp.dest('./build/static/images/'));
  });
};