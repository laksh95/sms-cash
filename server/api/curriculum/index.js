var express=require('express');
var router= express.Router();
var controller= require('./curriculum.controller');

//router.get('/',controller.getData);
router.post('/getSemester',controller.getSemesterListWithNoCurriculum);
router.post('/getDepartmentList',controller.getDepartmentList);
router.post('/getAllCurriculum',controller.getCurriculum);
router.post('/addCurriculum', controller.addCurriculum);
router.post('/assignSubjects', controller.assignSubjectElective);
router.delete('/deleteCurriculum', controller.deleteCurriculum);
router.post('/freezeCurriculum', controller.freezeCurriculum);

//router.put('/port',controller.changePort);
//router.delete('/',controller.deleteAddressById);


module.exports = router ;