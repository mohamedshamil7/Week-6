var express = require('express');
var router = express.Router();

const{adminLoginRoute,redirectDash,adminSession,nocache,isadminLoggedIn,getAllUsersRoute,deleteUser,getEditUser,editUser,addUserPage,addUserRoute,adminLogout}=require('../controller/adminController')

/* GET home page. */

router.get('/',nocache,adminSession,getAllUsersRoute);


router.post('/admin-submit',adminLoginRoute,redirectDash)

router.get('/deleteUser/:id',deleteUser,redirectDash)

router.get('/edituser/:id',getEditUser)
 
router.post('/edit-submit',editUser,redirectDash)

router.get('/addUser',addUserPage)

router.post('/addUser-submit',addUserRoute,redirectDash)

router.get('/logout',adminLogout)

// router.get('/adminDash',adminSession,(req,res)=>{
//   res.render('adminView/adminDash',{usersData})
// })
 

module.exports = router; 