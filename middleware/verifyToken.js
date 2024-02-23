const jwt=require('jsonwebtoken')

const verifyToken=(request,response,next)=>{
    let bearerToken=request.app.body.headers.Authorization;
    console.log(bearerToken);
    if(bearerToken===undefined){
        response.send({message:"Unauthorized Request"});
    }
    let token=bearerToken.split(" ")[1];
    try{
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch(error){
        response.send({message:"Session expired...Relogin to continue"})
    }
}

module.exports=verifyToken