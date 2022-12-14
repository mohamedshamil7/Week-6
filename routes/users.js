var express = require('express');
const app = require('../app');
var router = express.Router();

const {userLoginRoute,userSignupRoute,userLogout,sessionCheck,nocache,redirectHome,rendersignup,renderHomewithUserData,userAccounts}= require('../controller/userController')

/* GET users listing. */
router.get('/',nocache,sessionCheck,redirectHome)

router.post('/login-submit',userLoginRoute)

router.get('/signup',rendersignup)
 
router.post('/signup-submit',userSignupRoute)

router.get('/home',nocache,sessionCheck,renderHomewithUserData)

router.get('/accounts',userAccounts)

router.get('/logout',nocache,userLogout)


module.exports = router;

