var express = require('express');
var router = express.Router();

const {userLoginRoute,userSignupRoute,sessionCheck,isLoggedIn}= require('../controller/userController')

/* GET users listing. */
router.get('/', isLoggedIn,function(req, res) {
  res.render('userView/login');
});

router.post('/login-submit',userLoginRoute)

router.get('/signup',(req,res)=>{
  res.render('userView/signup');
})

router.post('/signup-submit',userSignupRoute)

router.get('/home',sessionCheck,(req,res)=>{
  res.render('userView/home')
})



module.exports = router;
