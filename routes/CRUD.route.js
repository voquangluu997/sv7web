var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/CRUD.controller");
router.get('/', controller.CRUD);	

router.get('/manager/:field/:type', controller.manager);	
router.get('/manager/:field/:type/search', controller.search);	
router.get('/insert', controller.insert);	
router.post('/insert', controller.postInsert);	
router.get('/edit/:_id', controller.edit);	
// router.post('/edit:_id', controller.postEdit);	
router.get('/delete/:_id', controller.delete);

router.get('/manager/:field',controller.managerField);
router.get('/insertField',controller.insertField);
router.post('/insertField',controller.postInsertField);
router.get('/deleteField/:_id',controller.deleteField);

module.exports = router;