//step 1 import required modules
const exp=require('express');
const app=exp();
const mclient=require('mongodb').MongoClient;
const userApi=require('./apis/userApi')
const cors=require('cors');
require('dotenv').config()
app.use(exp.json())
app.use(cors());
// app.use(exp.static(path.join(__dirname,'./build')))
mclient.connect(process.env.DATABASE_CONNECTION_URL)
.then((client)=>{
    let database=client.db('taskhub');
    let usercollection=database.collection('usercollection');
    app.set('usercollection',usercollection)
    console.log("Database connection success");
})
.catch(error=>{
    console.log("Error occurred",error);
})
app.use('/users',userApi);
// app.use("*",(request,response)=>{
//     response.sendFile(path.join(__dirname,'./build/index.html'));
// })

app.use((error,request,response,next)=>{
    console.log("Error occurred ",error);
    response.send({message:"Error occurred"});
})
app.listen(process.env.PORT,()=>{
    console.log("Server listening to port ",process.env.PORT);
})