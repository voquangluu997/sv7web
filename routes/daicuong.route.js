
var express = require('express');
var router = express.Router(); 
var verify = require('../middleware/auth.middleware');
var controller = require("../controllers/daicuong.controller");

router.get('/', verify.authMiddleware, controller.index);	

router.get('/search',controller.search);

module.exports = router;
