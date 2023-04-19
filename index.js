const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {json,urlencoded}=express;
const app=express();
app.use(json());
app.get('/', (req, res) => {
    res.send("welcome world");
  });
  mongoose.connect("mongodb://mohan:6UHZ7doz9kOG13XT@ac-zzncgsl-shard-00-00.ihstl2w.mongodb.net:27017,ac-zzncgsl-shard-00-01.ihstl2w.mongodb.net:27017,ac-zzncgsl-shard-00-02.ihstl2w.mongodb.net:27017/mongoIntro?ssl=true&replicaSet=atlas-g87p36-shard-0&authSource=admin&retryWrites=true&w=majority");
app.use(urlencoded({extended:false}));
app.post("/createUser", async (req,res)=> {
    try {
       const checkEmail = await User.find({email : req.body.email});
       if(checkEmail.length) {
         throw new Error("Email already registered");
       }
       const checkPhone = await User.find({phone : req.body.phone});
       if(checkPhone.length) {
         throw new Error("Phone already registered");
       }
       const checkUsername = await User.find({username : req.body.username});
       if(checkUsername.length) {
         throw new Error("username already registered");
       }
       const salt = await genSalt();
       const hashedPass = await hash(req.body.password,salt);
       const newUser = await User.create({
         ...req.body,
         password : hashedPass,
          createdAt : new Date(),
         updatedAt: new Date()
     });
       res.send(newUser);
    } catch (error) {
      res.send(error.message)
    }
 })
app.listen(5000,()=>console.log("server is running at port 5000"));

