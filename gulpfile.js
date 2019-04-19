const gulp = require('gulp');
const babel = require("gulp-babel");
const ugfy = require("gulp-uglify");
const mincss = require("gulp-minify-css");
const imagemin = require("gulp-imagemin");
const web = require("gulp-webserver");
gulp.task("mincss", () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(mincss())
        .pipe(gulp.dest("./dist/css"))
})

gulp.task('ugjs', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(ugfy())
        .pipe(gulp.dest("./dist/js"))
})

gulp.task("imgmin", () => {
    return gulp.src('./src/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
})

gulp.task("webs", () => {
    gulp.src("./src")
        .pipe(web({
            port: 8000,
            open: true,
            livereload: true,
            proxies: [
                { source: "/getdata", target: "http://localhost:3000/getdata" }
            ]
        }))
})

gulp.task("watch", () => {
    gulp.watch(["./src/css/**/*.css", "./src/js/**/*.js", "./src/imgs/*"], gulp.series("mincss", "ugjs", "imgmin"))
})

gulp.task("default", gulp.series("mincss", "ugjs", "imgmin", "webs"))