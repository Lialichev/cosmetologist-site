var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('scss', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('css', function(){ // Создаем таск Sass
    return gulp.src('src/css/**/*.css') // Берем источник
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'css', 'scss'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/css/**/*.css', ['css']); // Наблюдение за css файлами в папке css
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);