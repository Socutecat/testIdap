var gulp         = require('gulp'),
	sass         = require('gulp-sass'), //Подключаем Sass пакет
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	sourcemaps   = require('gulp-sourcemaps'),
	notify       = require('gulp-notify'),
	plumber      = require('gulp-plumber');

// Сообщение об ошибке
var onError = function(error){
	return error.messageOriginal ?
	"File: " + error.file +
	"\rAt: " + error.line + error.column +
	"\r" + error.messageOriginal :
	error;
}

gulp.task('sass', function(){ // Создаем таск "sass"
	return gulp.src('app/scss/**/*.scss') // Берем все scss файлы из папки sсss и дочерних, если таковые будут
		.pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler : notify.onError({
				title: 'SCSS error',
				message: onError
			})
		}))
		.pipe(sass()) // Преобразуем Scss в CSS посредством gulp-sass
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})) // Создаем префиксы
		.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(notify({message: 'SCSS created', onLast: true})) // Сообщение о успешном завершении		
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		}
	});
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за scss файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JavaScript файлами 
	gulp.watch('app/img/**/*', browserSync.reload); // Наблюдение за файлами изображений 
	gulp.watch('app/fonts/**/*', browserSync.reload); // Наблюдение за файлами шрифтов 
});

gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src('app/css/style.css') // Переносим CSS стили в продакшен
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildJs = gulp.src('app/img/**/*') // Переносим изображения в продакшен
	.pipe(gulp.dest('dist/img'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);