var express=require('express');
var router= express.Router();
var controller= require('./userDetail.controller');

//router.get('/',controller.getData);
//router.get('/',controller.getAddress );
router.post('/',controller.getUser);
//router.put('/port',controller.changePort);
//router.delete('/',controller.deleteAddressById);

// router.put('/',controller.updateData);
// router.delete('/',controller.deleteEmp);


module.exports = router ;
