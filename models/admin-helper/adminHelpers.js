var db=require('../db-connection/dbConnection')
var collection=require('../db-connection/collection')
let bcrypt=require('bcrypt');
const { ObjectId } = require('mongodb');
const { use } = require('../../app');


module.exports={
    adminLogin:(adminData)=>{
        console.log(adminData);
        return new Promise(async(resolve,reject)=>{
            let admin= await db.get().collection(collection.ADMIN_COLLECTION).findOne({adminId:adminData.adminId})
            if(admin){
                bcrypt.compare(adminData.password,admin.password).then((result)=>{
                    if(result){

                        resolve(result)
                    }else{
                        reject()
                    }
                })
            }
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users= await db.get().collection(collection.USER_COLLECTION).find().toArray()
            if(users) resolve(users)
            else reject()
        }) 
    } ,
    RemoveUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id: ObjectId(userId) }).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getEditUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            var user=db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(userId)})
            if(user) resolve (user)
            else reject()
        })
    },
    editUserData:(userid)=>{
        return new Promise((resolve,reject)=>{
            var user=db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userid)},{
                $set:{
                    username:userid.username,
                    email:userid.email
                    
                }
            })
            if(user) resolve(user)
            else reject();

        })
       

    }
}