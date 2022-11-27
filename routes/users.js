var express = require('express');
const app = require('../app');
var router = express.Router();

const {userLoginRoute,userSignupRoute,userLogout,sessionCheck,LogiinSession,nocache,redirectHome,rendersignup,renderHome}= require('../controller/userController')

/* GET users listing. */
router.get('/',nocache,sessionCheck,redirectHome)

router.post('/login-submit',userLoginRoute)

router.get('/signup',rendersignup)
 
router.post('/signup-submit',userSignupRoute)

router.get('/home',nocache,sessionCheck,renderHome)

router.get('/logout',nocache,userLogout)


module.exports = router;
