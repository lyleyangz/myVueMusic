const express = require('express')
const router = express.Router();

var routerMethods = require('../controller/controller')




// router.get('/',routerMethods.showRecycleBin);
router.get('/',routerMethods.showRecycleBin);

router.get('/:type/:holdersName/:folderFileExt',routerMethods.deletePics)
 
module.exports = router 