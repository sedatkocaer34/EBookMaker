const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose =require('mongoose');
/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.send('respond with a resource');
});

router.post('/addNewUser',(req,res,next) =>{
  const user = new User(req.body);
  const promise = user.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({data:null,error:err.message});
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
