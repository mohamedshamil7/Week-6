var express = require('express');
var router = express.Router();

const{adminLoginRoute,adminSession,isadminLoggedIn,getAllUsersRoute,deleteUser,getEditUser,editUser}=require('../controller/adminController')

/* GET home page. */

router.post('/admin-submit',adminLoginRoute)


router.get('/',adminSession,getAllUsersRoute);

router.get('/deleteUser/:id',deleteUser)

router.get('/edituser/:id',getEditUser)
 
router.post('/edit-submit',editUser)


// router.get('/adminDash',adminSession,(req,res)=>{
//   res.render('adminView/adminDash',{usersData})
// })
 

module.exports = router; 