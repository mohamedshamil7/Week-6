    const { response } = require('../app');
const userHelpers=require('../models/user-helper/userHelpers')



module.exports={


    nocache:(req, res, next) =>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
      },


    redirectHome:(req,res)=>{
        res.redirect('/home')
      },

      
    renderHome:(req,res)=>{
        res.render('userView/home')
      },
      rendersignup:(req,res)=>{
        res.render('userView/signup')
      },
      renderHomewithUserData:(req,res)=>{
        username=req.session.user.username
        console.log(username);
        res.render('userView/home',{username})
      },

    userLoginRoute :(req,res)=>{

    
        userHelpers.doLogin(req.body).then((data)=>{
            if(req.body.username ||req.nody.email || req.body.username)

            console.log("called/////////////////////"+data.userid);
            req.session.user={username:data.username,id:data.userid}
          

            req.session.UserloggedIn=true
            // let userses= req.session.user
            
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
     sessionCheck :(req,res,next)=>{
        if(!req.session.user){   
            req.session.UserloggedIn=false
        }

        if(req.session.user){
           console.log("session checking chekcing"+req.session.user+".>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..>>>>>>......>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              
           console.log('going to call next');
           next()  
       } 
       else {
           
           res.render('userView/login')
           }
      }, 

userAccounts:(req,res)=>{
    console.log("//////////log///////////");
// console.log(req.session.id);
    userHelpers.getData(req.session.user.id).then((response)=>{
        console.log("//////////////////////reposne////////////");
        console.log(response);
        res.render('userView/accounts',{response})

    }).catch(()=>{
        console.log("error in fecthing user data!!!");
    }) 
},
    userLogout:(req,res)=>{
        req.session.user=null
        req.session.UserloggedIn=false
        res.render('userView/login')
    },
    LogiinSession:(req,res,next)=>{
        if(req.session.user){
            console.log(req.session.user+"---------------------11111---------------------------");
            res.redirect('/home')

        }else{

            console.log("#################################else working############################");
            next()
        }

    },
  

     

    
     

}
