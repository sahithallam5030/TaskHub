const exp=require('express');
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler');
require('dotenv').config()


userApp.use(exp.json());
userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userObject=request.body;
    //check whether the username exists
    let userOfDb=await usercollection.findOne({username:userObject.username});
    if(userOfDb===null){
        //new user
        let hashedpassword=await bcryptjs.hash(userObject.password,6);
        userObject.password=hashedpassword;
        userObject.tasklist=[];
        await usercollection.insertOne(userObject);
        response.send({message:"Account created successfully",payload:userObject})
    }
    else{
        //exisiting user
        response.send({message:"Username already exists"});
    }
}))
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userdetails=request.body;
    //check if the username exists
    let userOfDb=await usercollection.findOne({username:userdetails.username});
    if(userOfDb===null){
        //not a user
        response.send({message:"Invalid user"})
    }
    else{
        //valid user
        //check password is correct or not
        let status=await bcryptjs.compare(userdetails.password,userOfDb.password);
        if(status===true){
            let token=jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:"1h"});
            response.send({message:"Success",payload:token,userObject:userOfDb});
        }
        else{
            response.send({message:"Incorrect password"})
        }
    }

}))
userApp.delete('/delete-user',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userdetails=request.body;
    //check if the username exists
    let userOfDb=await usercollection.findOne({username:userdetails.username});
    if(userOfDb===null){
        response.send({message:"Invalid Credentials"});
    }
    else{
        await usercollection.deleteOne({username:userdetails.username});
        response.send({message:"Account deleted successfully"})
    }
}))
userApp.put('/update',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userObject=request.body;
    let userOfDb=await usercollection.findOne({username:userObject.username});
    userOfDb.tasklist=userObject.tasklist;
    await usercollection.updateOne({username:userObject.username},{$set:userOfDb});
    response.send({message:"Data updated successfully"});
}))
module.exports=userApp