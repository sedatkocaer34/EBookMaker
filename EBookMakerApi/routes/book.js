const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth =require('../security/jwtAuth');
const mongoose =require('mongoose');
const { json } = require('express');

router.post('/addnewbook',(req,res,next)=>{
    const book = new Book(req.body);
    const promise = book.save();

    promise.then((result) => {
        res.json({status:true,id:result._id});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getbook/:bookId',auth.required,(req,res)=>{
    const bookId= req.params.bookId;
    const promise = Book.findById(mongoose.Types.ObjectId(bookId));
    promise.then((book)=>{
      res.json({success:true,book:book});
    }).catch((err)=>{
      res.json({success:false,error:err.message});
    });
});

router.put('/updatebook/:bookId',auth.required,(req,res,next)=>{
    const bookId = req.params.bookId;
    const bookData = JSON.parse(JSON.stringify(req.body));

    const promise = Book.findByIdAndUpdate(bookId,bookData,{new:true});
    promise.then((result) => {
        if(!result)
        {
            res.json({status:false,message:"Book Not Found"});
        }
        res.json({status:true,result});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getbooklist/:userId',auth.required,(req,res,next)=>{
    const userId= req.params.userId;
    const promise = Book.aggregate([
		{
			$match: {
				'userId': mongoose.Types.ObjectId(userId)
			}
		},
        {
			$group: {
				_id: {
					_id: '$_id',
					title: '$title',
					description: '$description',
                    createdDate:'$createdDate'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				title: '$_id.title',
				description: '$_id.description',
                createdDate:'$_id.createdDate'
			}
		}
	]);

    promise.then((data)=>{

        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

module.exports=router;