const userHelpers=require('../models/user-helper/userHelpers')



module.exports={

    userLoginRoute :(req,res)=>{
        userHelpers.doLogin(req.body).then((response)=>{
            req.session.user=req.body.username
            req.session.loggedin=true

            console.log("session created");
            res.redirect('/home')
            console.log('redirect home');
        }).catch(()=>{

            req.session.LoginErr="Invalid Username or Password"
            res.render('userView/login',{"error":req.session.LoginErr})
            req.session.LoginErr=null

        })
    },

    userSignupRoute :(req,res)=>{
        userHelpers.doSignup(req.body).then((response)=>{
            res.redirect('/home')
            console.log(response);
        }).catch((user)=>{
           if(user) res.render('userView/signup',{error:"username already exists!!!"})
        })
        .catch((err)=>{
            console.log("ERROR occured during signup");
            console.log(err);
        })

    },
    sessionCheck:(req,res,next)=>{
         if(req.session.user){
            console.log('going to call next');
            next()
         } 
         else {
            req.session.LoginErr=null
            res.render('userView/login')}
    },
    isLoggedIn:(req,res,next)=>{
        if(!req.session.user){
            req.session.loggedin=false
        }
        if(req.session.user){
            res.redirect('/home')
        }
        else{
            req.session.LoginErr=null
            res.render('userView/login')
        }
    }

}
