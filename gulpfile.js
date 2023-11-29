const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync");
const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const watch = require("gulp-watch");
const htmlhint = require("gulp-htmlhint");

gulp.task("sass", function() {
    return (
        gulp.src("assets/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest("assets/css"))
    );
});

gulp.task("js", function() {
    return (
        gulp.src("assets/js/**/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("assets/js-min"))
    );
});


// gulp.task('html', function() {
//     return (
//         gulp.src("*.html", "pages/*.html")
//         .pipe(plumber())
//         .pipe(htmlhint())
//         .pipe(htmlhint.reporter())
//         .pipe(browserSync.reload({stream:true}))
//     );
// });

gulp.task("server", function() {
    browserSync({
        server: {
            baseDir: "./",
        },
    });
});

gulp.task("watch-files", (done) => {
    gulp.watch("assets/sass/**/*.scss", gulp.task('sass'));
    gulp.watch("assets/js/**/*.js", gulp.task('js'));
    // gulp.watch("*.html", gulp.task('html'));
    done();
});

// default=npx gulp
gulp.task('default', gulp.series( 
    gulp.parallel('watch-files', 'server'), (done) => {
    done();
}));

