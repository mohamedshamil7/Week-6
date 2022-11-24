const userHelpers=require('../models/user-helper/userHelpers')



module.exports={

    userLoginRoute :(req,res)=>{
        userHelpers.doLogin(req.body).then((response)=>{
            req.session.user=req.body.username
            req.session.loggedin=true

            console.log("session created");
            res.redirect('/home')
            console.log('redirect home');
            // console.log(response+"<<<<login sucess");
        }).catch(()=>{
            res.render('userView/login',{error:"invalid Username or password"})
        })
    },

    userSignupRoute :(req,res)=>{
        userHelpers.doSignup(req.body).then((response)=>{
            res.redirect('/home')
            console.log(response);
        }).catch((err)=>{
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
            console.log('else called');
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
            res.render('userView/login')
        }
    }

}
