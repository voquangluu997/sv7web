require('dotenv').config();
var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
var bodyParse = require('body-parser');
var auth = require('./middleware/auth.middleware');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY));	

const PORT = process.env.PORT||9000;
var dethiRoute = require('./routes/dethi.route');
var baseRoute = require('./routes/base.route');
var authRoute = require('./routes/auth.route');
var CRUDRoute = require('./routes/CRUD.route');
var userRoute = require('./routes/user.route');
var authorRoute = require(('./routes/author.route'));

var mysql = require('mysql2');
var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: '',
  database: process.env.MYSQL_DB
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!")
});


// middle wares facebook
require('./config/passport')(passport);
app.use(session({secret: 'process.env.SECRET_KEY',
 				resave:true,
 				saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/CRUD',auth.authAdmin,CRUDRoute);
app.use('/',baseRoute);	
app.use('/dethi',dethiRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);	
app.use('/author',authorRoute);	

app.listen(PORT,function(){
	console.log('server is run at ' + process.env.PORT +' mode on port '+ PORT);
});

