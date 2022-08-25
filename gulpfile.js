var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
gulp.task('sass',function(){
    return sass('./scss/*.scss')
    .on('error',function(err){
        console.log('Error!',err.message);
    })
    .pipe(gulp.dest('./css'));
})

gulp.task('watch',function(){
    gulp.watch('./scss/*.scss',['sass']);
})
gulp.task('default',['sass','watch']);