const mongoose = require("mongoose")

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:
     {
        type:String,
        ruquired:true,
        unique :true
    },

    email:
    {
        type:String,
        ruquired:true,
        unique :true
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
            next(new Error("Emial is already exists."));
        }
    } else {
      next();
    }
  });

module.exports = mongoose.model("user", userSchema);