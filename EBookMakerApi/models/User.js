const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:
     {
        type:String,
        require:true,
        unique :true
    },

    email:
    {
        type:String,
        ruquired:true,
        unique :true
    },
    password:
    {
        type:String,
        require:true
    },
    passcontent:
    {
        type:String,
        require:true
    }
});


userSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        if(error.keyPattern['username']==1)
        {
            next(new Error("Username is already exists."));
        }
        else if(error.keyPattern['email']==1)
        {
            next(new Error("Email is already exists."));
        }
    } else {
      next();
    }
  });


userSchema.methods.generateJWT = ()=> {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };
  

module.exports = mongoose.model("user", userSchema);