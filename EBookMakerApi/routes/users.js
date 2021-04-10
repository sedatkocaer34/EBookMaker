const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose =require('mongoose');
const { encrypt, decrypt } = require('../security/crpyto');
const auth = require('../security/jwtAuth');

router.post('/addnewuser', async (req,res,next) =>{
  const user = new User(req.body);

   encrypt(user.password).then((hash )=>{
    user.password=hash.iv;
    user.passcontent=hash.content;
    const promise = user.save();
  
    promise.then((data)=>{
      res.json({status:true,id:data._id,username:data.username,email:data.email});
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
            return res.status(200).json({status:true, id:user._id,username:user.username,email:user.email,token:token});
         }
         else
            return res.json({status:false,message:"Email or password wrong."});
      })
    }
    else
      return res.json({status:false,message:"Email or password wrong."});
  }).catch((err)=>{
    res.status(500).json({message:"Something went wrong.",error:err.message});
  });
});

router.get('/getUser/:userId',auth.required,(req,res,next) =>{
  const userId= req.params.userId;
  const promise = User.findById(mongoose.Types.ObjectId(userId));

  promise.then((user)=>{
    const pass = "********";
    res.json({username:user.username,email:user.email,password:pass});
  }).catch((err)=>{
    res.json({user:null,error:err.message});
  });
});

router.put('/updateUser/:userId',auth.required,(req,res,next) =>{
  const userId= req.params.userId;
  const userUpdate = JSON.parse(JSON.stringify(req.body));

  const promiseUser = User.findById(userId);
  promiseUser.then((user)=>{
     if(!user)
     {
       res.json({message:"User not found"});
     }
     user.username=userUpdate.username;
     user.email=userUpdate.email;
     const updatedUser = User.findOneAndUpdate({_id:userId},user,{upsert: true});
     updatedUser.then((userdata)=>{
       if(userdata)
           res.json({status:true,message:"Profile Updated"});  
       else
           res.json({status:false,message:"something went wrong"})
     });
     
   }).catch((err)=>{
     res.json({status:false,error:err.message});
   });
});

router.put('/updatepassword/:userId',auth.required,(req,res,next) =>{
  const userId= req.params.userId;
  const {oldpass,newpass} = JSON.parse(JSON.stringify(req.body));

  const promise = User.findById(mongoose.Types.ObjectId(userId));
   promise.then((user)=>{
     if(user)
     {
        decrypt({iv:user.password,content:user.passcontent}).then((hash )=>{
          if(hash.toString()===oldpass)
          {
            encrypt(newpass).then((hash )=>{
              user.password=hash.iv;
              user.passcontent=hash.content;
              const promiseUpdated = User.findByIdAndUpdate(userId ,user,{new :true})
              promiseUpdated.then((updatedUser)=>{
                  if(updatedUser)
                      return res.json({status:true,message:"Password changed."})
                  else
                      return res.json({status:false,message:"Something went wrong."});
              }).catch((err)=>{
                res.json({user:null,error:err.message});
              });
            });
          }
          else
              return res.json({status:false,message:"Password not true."});
        })
     }
     else
        res.json({status:false,message:"User not found."});  
   })
   .catch((err)=>{
     res.json({status:false,error:err.message});
   });

});

module.exports = router;
