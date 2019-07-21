require ('./config/mongoose');//OK
// require('./config/sequelize');


const express = require('express'); //OK
const path = require('path'); //OK

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// const session = require('express-session');
// const passport = require('passport');

// const config = require('./config/password')

//load the router module in the app
const indexRouter = require('./routes/index'); //OK
const usersRouter = require('./routes/users'); //OK
// const destinationsRouter = require('./routes/destinations')

const app = express(); //OK
const PORT = process.env.PORT || 3001;


// view engine setup
//'VIEWS' : the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));//OK
app.set('view engine', 'hbs'); //OK


// EXPRESS.STATIC(ROOT, [OPTIONS]) - The root argument specifies the root directory from which to serve static assets. The function determines the file to serve by combining req.url with the provided root directory.
app.use(express.static(path.join(__dirname, 'public'))); //OK
//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. 
app.use(express.json());//OK

app.use(logger('dev'));
app.use(cookieParser());

// app.use(session({
//   secret: 'super duper secret',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

//An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any).
//This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated();
//   res.locals.session = req.session;
//   // console.log(req.locals)
//   next();
// })


//returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body
app.use(express.urlencoded({ extended: false }));//OK

//mounts the router module on a path in the main app.
app.use('/', indexRouter); //OK
app.use('/users', usersRouter); //OK
// app.use('/destinations', destinationsRouter); //OK

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => console.log(`Servidor levantado en port ${PORT}`));

module.exports = app; 
