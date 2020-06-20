var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/CRUD.controller");
router.get('/', controller.CRUD);	

router.get('/manager/:field/:type', controller.manager);	
router.get('/manager/:field/:type/search', controller.searchItem);	
router.get('/insert', controller.insertItem);	
router.post('/insert', controller.postInsertItem);	
router.get('/edit/:_id', controller.editItem);	
router.post('/edit/:_id', controller.postEditItem);	
router.get('/delete/:_id', controller.deleteItem);

router.get('/managerField/:field',controller.managerField);
router.get('/managerField/:field/search',controller.searchField);
router.get('/insertField',controller.insertField);
router.post('/insertField',controller.postInsertField);
router.get('/editField/:_id', controller.editField);	
router.post('/editField/:_id', controller.postEditField);
router.get('/deleteField/:_id',controller.deleteField);

router.get('/managerCourse/:field',controller.managerCourse);
router.get('/managerCourse/:field/search',controller.searchCourse);
router.get('/insertCourse',controller.insertCourse);
router.post('/insertCourse',controller.postInsertCourse);
router.get('/editCourse/:_id', controller.editCourse);	
router.post('/editCourse/:_id', controller.postEditCourse);
router.get('/deleteCourse/:_id',controller.deleteCourse);


router.get('/managerUser', controller.managerUser);
router.get('/managerUser/search', controller.searchUser);
router.get('/editUser/:_id', controller.editUser);
router.post('/editUser/:_id', controller.postEditUser);
router.get('/deleteUser/:_id',controller.deleteUser);

router.get('/noti',controller.noti);
router.post('/noti',controller.postNoti);

module.exports = router;	