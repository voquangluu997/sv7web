require('dotenv').config();
var express = require('express');
var db = require('./db');
var daicuongRoute = require('./routes/daicuong.route');
// var chuyennganhRoute = require('./routes/chuyennganh.route');
// var avnanglucRoute = require('./routes/avnangluc.route');
// var toeicRoute = require('./routes/toeic.route');
// var hocdanRoute = require('./routes/hocdan.route');
// var laptrinhRoute = require('./routes/laptrinh.route');
// var userRoute = require('./routes/user.route');

var port =3000;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err)
    });

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use('/daicuong', daicuongRoute);
// app.use('/chuyennganh', chuyennganhRoute);
// app.use('/avnangluc', avnanglucRoute);
// app.use('/toeic', toeicRoute);
// app.use('/hocdan', hocdanRoute);
// app.use('/laptrinh', laptrinhRoute);
// app.use('/user', userRoute);

// var bodyParse = require('body-parser');
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/',function(req,res){
	res.render('layouts/index');
});



// app.get('/users',function(req,res){
// 	res.render('users/index',{
// 		users:users
// 	});
// });

// app.get('/users/search',function(req,res){
// 	var q= req.query.q;
// 	var matchedUsers = users.filter(function(user){
// 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1; 
// 	});
// 	res.render('users/index',{
// 		users:matchedUsers
// 	})
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

