const express=require('express')
const app=express();
const port=process.env.PORT||500;
const cors=require('cors')


app.use(cors())
//mongodb connection

const {MongoClient}=require('mongodb');
const url="mongodb+srv://suhasgowda:l5OQO1Ejlch2ihRt@cluster0.xuftx.mongodb.net/test"
const client=new MongoClient(url);


app.get('/api/items/getitems',async(req,res)=>{
    let result=await client.connect();
    let db=result.db("rentals");
    let collection=db.collection("items")
    let data=await collection.find({}).toArray()
    console.log(data)
    res.send(data)
})

app.get(`/api/items/getitems/:id`,async(req,res)=>{
    console.log("first")
    console.log(req.params)
    let result=await client.connect();
    let db= await result.db("rentals");
    let collection=await db.collection("items")
    let data=await collection.find({id:req.params.id}).toArray()
    console.log(data)
    res.send(data)
})

app.listen(port,()=>{
    console.log(`this is running well in port ${port} `)
})