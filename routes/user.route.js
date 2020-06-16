var express = require('express');
var router = express.Router(); 

var multer  = require('multer');
var controller = require("../controllers/user.controller");
var auth = require('../middleware/auth.middleware.js');
const multerConf = {
	storage : multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'./public/uploads');
	},
	filename: function(req,file,cb){	
		const ext = file.mimetype.split('/')[1];
		 cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
		}
	}),
	fileFilter : function(req,file,cb){
		if(!file){
			cb();
		}
		const image = file.mimetype.startsWith('image/');
		if(image){
			cb(null,true);
		}else{
			cb({ message : "file type not supported "}, false);
		}
	}
};

router.post('/profile',auth.authMiddleware,multer(multerConf).single('avatar'),controller.postProfile)
router.get('/profile', auth.authMiddleware,controller.profile);	
router.get('/profile/:_id',controller.seeProfile);	


module.exports = router;


