const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const mongoose =require('mongoose');

router.post('/addnewbook',(req,res,next)=>{
    const book = new Book(req.body);
    const promise = book.save();

    promise.then((result) => {
        res.json({status:true,id:result._id});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getbook/:bookId',(req,res,next)=>{
    const bookId= req.params.bookId;
    const promise = Book.findById(mongoose.Types.ObjectId(bookId));
    promise.then((book)=>{
      res.json({success:true,book:book});
    }).catch((err)=>{
      res.json({success:false,error:err.message});
    });
});

router.get('/getbooklist/:userId',(req,res,next)=>{
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