if (!process.env.PORT) {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const index = require('./routes/index');
const pets = require('./routes/pets');
const comments = require('./routes/comments');
const purchases = require('./routes/purchases');

const flash = require('express-flash');
const session = require('express-session');


const app = express();

const paginate = require('express-paginate');
app.use(paginate.middleware(4, 50));


// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

require('dotenv').config();

// Postgres - Heroku
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// DB set-up
const Sequelize = require('sequelize');

const sequelize = new Sequelize('famous-amos', 'fcruz', process.env.SQLPASS, {
    dialect: 'postgres'
});

// sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: true
//     }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/pets', pets);
app.use('/pets/:petId/comments', comments);
app.use(purchases);


// AWS?
const Upload = require('s3-uploader');

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(err.status == 404) {
  //do logging and user-friendly error message display
    res.redirect('/404.html');
  } else if (err.status == 500) {
    res.redirect('/500.html');
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
