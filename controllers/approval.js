var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user')
var Topic = require('../models/topic')

router.route('/addUser')
.get(function(req,res){
	var newUser = new User({
		email : "linhvan@gmail.com",
		username : "Linh Văn",
		password: 12345678,
		position : 2
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
	res.render('./approval/index')
})

router.route('/background')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 2){
			Topic.find({'status' : 0, 'category':'Background'},{'title':1,'status':1,'_id':1,'artistId':1})
			.sort({'updated_at': 1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					
					res.render('./approval/background', {topicbackground: JSON.parse(end)});
				}
			})
		}else{
			res.redirect('/');
		}
	}

})

router.route('/character')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 2){
			Topic.find({'status' : 0, 'category':'Character'},{'title':1,'status':1,'_id':1,'artistId':1})
			.sort({'updated_at': 1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					
					res.render('./approval/character', {topiccharacter: JSON.parse(end)});
				}
			})
		}else{
			res.redirect('/');
		}
	}

})

router.route('/sticker')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 2){
			Topic.find({'status' : 0, 'category':'Sticker'},{'title':1,'status':1,'_id':1,'artistId':1})
			.sort({'updated_at': 1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					
					res.render('./approval/sticker', {topicsticker: JSON.parse(end)});
				}
			})
		}else{
			res.redirect('/');
		}
	}

})


module.exports = router