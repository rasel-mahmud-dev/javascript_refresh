"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes_1 = __importDefault(require("./routes"));
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
app.set('views', path.resolve('views'));
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
(0, routes_1.default)(app);
// app.use('/users', usersRouter);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
if (process.env.NODE_ENV === "development") {
    // app.listen(1000, () => console.log("server is running on port 1000"))
}
exports.default = app;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBOEM7QUFDOUMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR2pDLHNEQUFnQztBQUdoQyw0Q0FBNEM7QUFDNUMsMkRBQTJEO0FBQzNELEVBQUU7QUFDRixxREFBcUQ7QUFDckQseURBQXlEO0FBQ3pELEVBQUU7QUFDRixtREFBbUQ7QUFDbkQscUJBQXFCO0FBQ3JCLG9DQUFvQztBQUNwQyxVQUFVO0FBQ1YsS0FBSztBQUdMLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLCtCQUErQjtBQUMvQiwwQ0FBMEM7QUFDMUMsZ0JBQWdCO0FBQ2hCLE9BQU87QUFFUCxvQkFBb0I7QUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pELEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUV4QiwyQkFBMkI7QUFDM0Isc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2Qyw2REFBNkQ7QUFDN0Qsb0JBQW9CO0FBQ3BCLE9BQU87QUFFUCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsd0RBQXdEO0FBRXhELElBQUEsZ0JBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUVkLGtDQUFrQztBQUdsQyx5Q0FBeUM7QUFDekMscUNBQXFDO0FBQ3JDLDRCQUE0QjtBQUM1QixNQUFNO0FBRU4sZ0JBQWdCO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ2xDLGtEQUFrRDtJQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFbkUsd0JBQXdCO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUU7SUFDekMsd0VBQXdFO0NBQ3pFO0FBRUQsa0JBQWUsR0FBRyxDQUFDO0FBTW5CLElBQUk7QUFDSixrQ0FBa0M7QUFDbEMsd0JBQXdCO0FBQ3hCLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsOEJBQThCO0FBQzlCLEtBQUs7QUFDTCxzQkFBc0I7QUFDdEIsK0JBQStCO0FBQy9CLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsdUJBQXVCO0FBQ3ZCLCtCQUErQjtBQUMvQix5QkFBeUI7QUFDekIsSUFBSTtBQUNKLElBQUkifQ==