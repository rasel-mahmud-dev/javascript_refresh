// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


import appRouter from './routes'


// const liveReload = require("livereload");
// const connectLiveReload = require("connect-livereload");
//
// const liveReloadServer = liveReload.createServer()
// liveReloadServer.watch(path.join(__dirname, 'views'));
//
// liveReloadServer.server.once("connection", ()=>{
//   setTimeout(()=>{
//     liveReloadServer.refresh("/")
//   }, 5)
// })


const app = express();
// app.use(connectLiveReload())
// app.use(require('connect-livereload')({
//   port: 35729
// }));

// view engine setup
app.set('views', path.resolve( 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(sassMiddleware({
//   src: path.resolve( 'src/public'),
//   dest: path.resolve('dist/public'),
//   indentedSyntax: false, // true = .sass and false = .scss
//   sourceMap: true
// }));

app.use(express.static(path.resolve('dist/public')));
// app.use(express.static(path.resolve( 'src/public')));

appRouter(app)

// app.use('/users', usersRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if(process.env.NODE_ENV === "development") {
  // app.listen(1000, () => console.log("server is running on port 1000"))
}

export default app;





// {
//   "name": "javascript-refresh",
//   "version": "0.0.0",
//   "private": true,
//   "scripts": {
//   "start": "node ./bin/www"
// },
//   "dependencies": {
//   "cookie-parser": "~1.4.4",
//     "debug": "~2.6.9",
//     "express": "~4.16.1",
//     "hbs": "~4.0.4",
//     "http-errors": "~1.6.3",
//     "morgan": "~1.9.1"
// }
// }
