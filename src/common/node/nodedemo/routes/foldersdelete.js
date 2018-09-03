const express = require('express')
const router = express.Router();

var routerMethods = require('../controller/controller')

router.get('/',routerMethods.showIndex);
router.get('/favicon.ico',routerMethods.showIndex);
router.get('/:albumsNames',routerMethods.showAlbums);
// router.get('/move/:file',routerMethods.movePics);
router.post('/:type/post',routerMethods.doPost)
module.exports = router 