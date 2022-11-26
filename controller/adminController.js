const { response } = require('../app')
const adminHelpers=require('../models/admin-helper/adminHelpers')
const userHelpers=require('../models/user-helper/userHelpers')
 const{doSignup}= require('../models/user-helper/userHelpers')
module.exports={
     

    adminLoginRoute:(req,res)=>{
adminHelpers.adminLogin(req.body).then((response)=>{
req.session.admin=req.body.adminId;

req.session.loggedIn=true
res.redirect('/admin')

}).catch(()=>{
    res.render('adminView/adminLogin',{error:'invalid Admin Id or Password'})
})
},

    adminSession:(req,res,next)=>{
        if(req.session.admin) next()
        else res.render('adminView/adminLogin')
    }, 


    isadminLoggedIn:(req,res)=>{
        if(!req.session.admin){
            req.session.loggedIn=false
        }
        if(req.session.admin){
            res.redirect('/admin')
        }else{
            res.render('adminView/adminLogin')

        }
    },
    getAllUsersRoute:(req,res)=>{

        adminHelpers.getAllUsers().then((users)=>{
            console.log(users);
            res.render('adminView/adminDash',{users})
        }
    )}
    ,
    deleteUser:(req,res)=>{
        adminHelpers.RemoveUser(req.params.id).then((response)=>{
            res.redirect('/admin')
        })
    },
    getEditUser:(req,res)=>{
        adminHelpers.getEditUser(req.params.id).then((userdetails)=>{
            console.log(userdetails);
            res.render('adminView/edituser',{userdetails})
            
        })
    },
    editUser:(req,res)=>{
        adminHelpers.editUserData(req.body).then((response)=>{
            res.redirect('/admin')
        })
        console.log(req.body);
    },
    addUserPage:(req,res)=>{
        res.render('adminView/addUser')
    },

    addUserRoute:(req,res)=>{
        doSignup(req.body).then((response)=>{
            console.log(response);
            res.redirect('/admin')
        }).catch(()=>{
            res.render('adminView/addUser',{error:'Error Occured'})
        })
    },
    adminLogout:(req,res)=>{
        req.session.admin=null
        req.session.loggedIn=false
        console.log('admin logged Out');
        res.render('adminView/adminLogin')
    }



} 