const express = require('express');
const router = express.Router();
const User = require('../models/User');
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

module.exports = router;
