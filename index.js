require('dotenv').config();
var express = require('express');
var app = express();
var port =3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
var bodyParse = require('body-parser');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// var chuyennganhRoute = require('./routes/chuyennganh.route');
// var avnanglucRoute = require('./routes/avnangluc.route');
// var toeicRoute = require('./routes/toeic.route');
// var hocdanRoute = require('./routes/hocdan.route');
// var laptrinhRoute = require('./routes/laptrinh.route');
var daicuongRoute = require('./routes/daicuong.route');
// var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
// var authMiddleware = require('./middleware/auth/middleware');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true }).then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err)
    });
app.get('/',function(req,res){
	res.render('layouts/index');
});
app.use('/daicuong', daicuongRoute);
// app.use('/', userRoute);
app.use('/', authRoute);
// app.use('/chuyennganh', chuyennganhRoute);
// app.use('/avnangluc', avnanglucRoute);
// app.use('/toeic', toeicRoute);
// app.use('/hocdan', hocdanRoute);
// app.use('/laptrinh', laptrinhRoute);
// app.get('/users',function(req,res){
// 	res.render('users/index',{
// 		users:users
// 	});
// });


// app.get('/users/create',function(req,res){
// 	res.render('users/create');
// });

// app.post('/users/create',function(req,res){
// 	users.push(req.body);
// 	res.redirect('/users');
// })

app.listen(port,function(){
	console.log('server listening on port '+ port);
});

