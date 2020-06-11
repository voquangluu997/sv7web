
var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/base.controller");
var multer  = require('multer');
var authMiddleware = require('../middleware/auth.middleware.js');

const multerConfMany = {
	storage : multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'./public/userUploads');
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

router.get('/',controller.home);
router.post('/',multer(multerConfMany).array('myFiles',20),controller.postDonggop);

router.get('/:field', controller.field);	

router.get('/:field/search', controller.fieldSearch);

router.get('/course/:skill',authMiddleware.authMiddleware, controller.course);
router.get('/course/:skill/search',authMiddleware.authMiddleware, controller.courseSearch);


module.exports = router;