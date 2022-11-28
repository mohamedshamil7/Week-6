var db=require('../db-connection/dbConnection')
var collection=require('../db-connection/collection')
const bcrypt=require('bcrypt');
const { response } = require('../../app');
const  {ObjectId}  = require('mongodb');
module.exports = {
  doSignup: (userData) => {
    return new Promise(async(resolve, reject) => {
        let user= await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
        if(user){
            reject(user=true)
        }
        else{
      userData.password = await bcrypt.hash(userData.password, 10);
      const result = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);
      if (result.insertedId) resolve(result);
      else reject()
  }});
  },

 doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        let user= await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
        if(user){
            await bcrypt.compare(userData.password,user.password).then((result)=>{



                if(result) {
                    
                    var userData={
                        username:user.username,
                        userid:user._id
                    }
                    resolve(userData)}
                else reject()
            })
        }
        else{
            reject()
        }
    })
 },

 getData:(userId)=>{ 

     

    return new Promise(async(resolve,reject)=>{
        console.log("emtered d\\get data");

        let data=await db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(userId)})

        if(data) resolve(data)
        else reject()
    })
 }
};
 

 