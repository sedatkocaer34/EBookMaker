const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose =require('mongoose');
const { encrypt, decrypt } = require('../security/crpyto');

router.post('/addnewuser', async (req,res,next) =>{
  const user = new User(req.body);

   encrypt(user.password).then((hash )=>{
    user.password=hash.iv;
    user.passcontent=hash.content;
    const promise = user.save();
  
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json({data:null,error:err.message});
    });
  });
});

router.post('/signin',(req,res,next)=>{
  const {email,password} = new User(req.body);
  const promise = User.findOne({email:email});

  promise.then((user)=>{   
    if(user)
    {
      decrypt({iv:user.password,content:user.passcontent}).then((hash )=>{
         if(hash.toString()===password)
         {
            const token = user.generateJWT();
            return res.json({token:token});
         }
         else
            return res.json({message:"Email or password wrong."});
      })
    }
    else
      return res.json({message:"Email or password wrong."});
  }).catch((err)=>{
    res.json({user:null,error:err.message});
  });
});

router.get('/getUser/:userId',(req,res,next) =>{
  const userId= req.params.userId;
  console.log(userId);
  const promise = User.findById(mongoose.Types.ObjectId(userId));

  promise.then((user)=>{
    res.json(user);
  }).catch((err)=>{
    res.json({user:null,error:err.message});
  });
});

router.put('/updateUser/:userId',(req,res,next) =>{
  const userId= req.params.userId;
  const userUpdate = JSON.parse(JSON.stringify(req.body));
  console.log(userUpdate);

  const promise = User.findByIdAndUpdate(userId ,userUpdate,{new :true})
   promise.then((user)=>{
     if(!user)
     {
       res.json({message:"User not found"});
     }
     res.json(user);  
   }).catch((err)=>{
     res.json({user:null,error:err.message});
   });
});

module.exports = router;
