var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

// 소스 파일 경로
var PATH = {
    SE:  {
        HTML: './SE/html',
        STYLE: './SE/scss',
    }
},
// 산출물 경로
DEST_PATH = {
    SE: {
        HTML: './SE'
    ,   STYLE: './SE/css/'
    }
};

gulp.task( 'scss:compile', () => {
    return new Promise( resolve => {
        var options = {
            // outputStyle: "nested" // nested, expanded, compact, compressed
            indentType: "space" // space, tab
            , indentWidth: 4 // 
            , precision: 8
            , sourceComments: true // 코멘트 제거 여부
        };

        gulp.src( PATH.SE.STYLE + '/*.scss' )
            .pipe( sourcemaps.init() )
            .pipe( sass(options) )
            .pipe( sourcemaps.write() )
            .pipe( gulp.dest( DEST_PATH.SE.STYLE ) );
        
        resolve();
    });
});

gulp.task( 'html', () => {
    return new Promise( resolve => {
        gulp.src( PATH.SE.HTML + '/*.html' )
            .pipe( gulp.dest( DEST_PATH.SE.HTML ) );

        resolve();
    });
});

gulp.task( 'nodemon:start', () => {
    return new Promise( resolve => {
        nodemon({
            script: 'app.js'
            , watch: 'app'
        });

        resolve();
    });
});

gulp.task('watch', () => {
    return new Promise( resolve => {
        gulp.watch(PATH.SE.HTML + "/**/*.html", gulp.series(['html']));
        gulp.watch(PATH.SE.scss + "/**/*.scss", gulp.series(['scss:compile']));
        
        resolve();
    });
});

gulp.task('browserSync', () => {
    return new Promise( resolve => {
        browserSync.init( null, {
            proxy: 'http://localhost:8005'
            , port: 8006
        });

        resolve();
    });
});

gulp.task( 'default', gulp.series(['scss:compile', 'html', 'nodemon:start', 'watch']));