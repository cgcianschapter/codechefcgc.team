require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalmongoose = require('passport-local-mongoose');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');
 


//require routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teamRouter = require('./routes/team');
const eventsRouter = require('./routes/events');
const blogRouter = require('./routes/blogs');



const app = express();

//connect to database
//mongoose.connect('mongodb://localhost:27017/codechef', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb+srv://Abhishek:noobmaster69@cluster0.l3k2t.mongodb.net/cgccoe?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to DB');
}).catch(err => {
  console.log('ERROR : ', err.message);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app config
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//passport and session config
app.use(expressSession({
	secret: "Sinchan",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//mount routes
app.use(indexRouter);
app.use(usersRouter);
app.use(teamRouter);
app.use(eventsRouter);
app.use(blogRouter);


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


module.exports = app;
