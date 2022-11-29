const { response } = require('../app')
const adminHelpers=require('../models/admin-helper/adminHelpers')
const userHelpers=require('../models/user-helper/userHelpers')
 const{doSignup}= require('../models/user-helper/userHelpers')
module.exports={


    nocache:(req, res, next) =>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
      },


     redirectDash:(req,res)=>{
    res.redirect('/admin')
    },
    renderAdduserPage:(req,res)=>{
        res.render('adminView/addUser')
    },

    adminLoginRoute:(req,res,next)=>{
    

    adminHelpers.adminLogin(req.body).then((response)=>{
    req.session.admin=req.body.adminId;

    req.session.loggedIn=true
    next()


    }).catch(()=>{
    res.render('adminView/adminLogin',{error:'invalid Admin Id or Password'})
    })
},

    adminSession:(req,res,next)=>{
        if(req.session.admin) next()
        else res.render('adminView/adminLogin')
    }, 
    getAllUsersRoute:(req,res)=>{

        adminHelpers.getAllUsers().then((users)=>{
            console.log(users);
            res.render('adminView/adminDash',{users})
        }
    )},
    deleteUser:(req,res,next)=>{
        adminHelpers.RemoveUser(req.params.id).then((response)=>{
            next()
        })
    },

    getEditUser:(req,res)=>{
        adminHelpers.getEditUser(req.params.id).then((userdetails)=>{
            console.log(userdetails);
            res.render('adminView/edituser',{userdetails})
            
        })
    },

    editUser:(req,res,next)=>{
        if( !req.body.username || !req.body.email){
            res.render('adminView/edituser',{error:"enter data"})
        }
        else{
            adminHelpers.editUserData(req.body).then((response)=>{
                next()
            })
            console.log(req.body);

        }
     
    },

    addUserPage:(req,res)=>{
        res.render('adminView/addUser')
    },

    addUserRoute:(req,res,next)=>{
        doSignup(req.body).then((response)=>{
            console.log(response);
            next()
        }).catch(()=>{
            res.render('adminView/addUser',{error:'Error Occured'})
        })
    },

    adminLogout:(req,res)=>{
        req.session.admin=null
        req.session.loggedIn=false
        console.log('admin logged Out');
        res.render('adminView/adminLogin')
    },

   




} 