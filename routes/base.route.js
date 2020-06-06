
var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/base.controller");

router.get('/',controller.home);
router.get('/daicuong', controller.daicuong);	
router.get('/chuyennganh',controller.chuyennganh);

router.get('/daicuong/search', controller.search);
module.exports = router;
