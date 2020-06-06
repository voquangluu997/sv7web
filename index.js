require('dotenv').config();
var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
var bodyParse = require('body-parser');
var auth = require('./middleware/auth.middleware');


// var passport = require('passport');
// var session = require('express-session');
// const fs = require('fs');
// const https = require('https');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const key = fs.readFileSync('./config/certkey/privateKey.key');
// const cert = fs.readFileSync('./config/certkey/certificate.crt');
const PORT = process.env.PORT||9000;
var dethiRoute = require('./routes/dethi.route');
var baseRoute = require('./routes/base.route');
// var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var CRUDRoute = require('./routes/CRUD.route');
var userRoute = require('./routes/user.route');

var mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
mongoose.connect(db,{ useFindAndModify: false,
					  useNewUrlParser: true,
					  useUnifiedTopology: true,

					 }).then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err)
    });
mongoose.set('useCreateIndex', true);
// app.get('/',function(req,res){
// 	res.render('layouts/index');
// });
//middle wares facebook
// require('./config/passport')(passport);
// app.use(session({secret: 'process.env.SECRET_KEY',
//  				resave:true,
//  				saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/daicuong', daicuongRoute);
app.use('/',dethiRoute);
// app.use('/', userRoute);
app.use('/', authRoute);
app.use('/CRUD',auth.authAdmin,CRUDRoute);
app.use('/',baseRoute);	
app.use('/user',userRoute);	



// var Server ;
// if(process.env.NODE_ENV === 'developement'){
// 	Server = https.createServer({key: key, cert : cert},app);
// }else{
// 	Server =app;
// }


app.listen(PORT,function(){
	console.log('server is run at ' + process.env.PORT +' mode on port '+ PORT);
});

