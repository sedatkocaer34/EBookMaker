const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:
    {
        type:String,
        require:true
    },
    description:
    {
        type:String,
        require:true
    },
    userId:Schema.Types.ObjectId,
    createdDate:{
        type:Date,
        default:Date.now
    },
    updatedDate:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("book",bookSchema);