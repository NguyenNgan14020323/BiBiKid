var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user')
var Feedback = require('../models/feedback');

router.route('/addUser')
.get(function(req,res){
	var newUser = new User({
		email : "adminbibi@gmail.com",
		username : "Admin bibi",
		password: 12345678,
		position : 3
	})
	newUser.save(function(err){
		if(err){
			res.json({message: err})
		}else{
			res.json({message:'success'})
		}
	})
})


router.route('/home')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 3){
			Feedback.find()
			.sort({'created_at':-1})
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					console.log(end+"cc")
					res.render('./admin/index',{feadback: JSON.parse(end),total:data.length})
				}
			})
		}else{
			res.redirect('/');
		}
	}
})

router.route('/userartist')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 3){
			User.find({'position' : 1},{'email':1,'username':1,'_id':1, 'password':1, 'alert':1})
			.sort({'updated_at': -1})
			.limit(20)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					Feedback.find()
					.sort({'created_at':-1})
					.exec(function(err,data1){
						if(err){
							res.json({message:err})
						}else{
							var cc = JSON.stringify(data1);
					
							res.render('./admin/user_artist',{userartist: JSON.parse(end),feadback: JSON.parse(cc),total:data1.length})
						}
					})
						
				}
			})
		}else{
			res.redirect('/');
		}
	}
	
})

router.route('/userapproval')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 3){
			User.find({'position' : 2},{'email':1,'username':1,'_id':1, 'password':1, 'alert':1})
			.sort({'updated_at': -1})
			.limit(20)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					res.render('./admin/user_approval', {userapproval: JSON.parse(end)});
				}
			})
		}else{
			res.redirect('/');
		}
	}
	
})

module.exports = router