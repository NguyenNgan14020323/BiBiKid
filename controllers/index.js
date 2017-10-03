var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user')
var Background = require('../models/background')
var Character = require('../models/character')
var Sticker = require('../models/sticker')
var Topic = require('../models/topic')
var Warning 	= require('../models/warning')
var ObjectID = require('mongodb').ObjectID;

router.route('/')
.get(function(req,res){
	if(typeof req.cookies.CookieEmail !== 'underfined'){

		var cookieE = req.cookies.CookieEmail;
		var cookieP = req.cookies.CookiePassword;
	    res.render('index', {email : cookieE, pass: cookieP});
		
	}else{
	    res.render('index')
    }
	
})

router.route('/home')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 1){
			var artistId = req.session._id;
			Warning.find({'user_was_warning':ObjectID(artistId)})
			.sort({'created_at':-1})
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
						var end = JSON.stringify(data);
						res.render('./artist/index',{warning: JSON.parse(end),total:data.length})
				}
			})
		
		}else{
			res.redirect('/');
		}
	}
	
})


router.route('/background')
.get(function(req,res){
	if(typeof req.session.position === 'underfined'){
		res.redirect('/')
	}else{
		if(req.session.position === 1){
			var artistId = req.session._id;
			Topic.find({'artistId':ObjectID(artistId), 'category':'Background'},{'title':1,'status':1,'_id':1})
			.sort({'updated_at': -1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					Warning.find({'user_was_warning':ObjectID(artistId)})
					.sort({'created_at':-1})
					.exec(function(err,data1){
						if(err){
							res.json({message:err})
						}else{
								var end1 = JSON.stringify(data1);
								res.render('./artist/background', {topicbackground: JSON.parse(end), warning: JSON.parse(end1),total:data1.length});
						}
					})
					
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
		if(req.session.position === 1){
			var artistId = req.session._id;
			Topic.find({'artistId':ObjectID(artistId),'category':'Character'},{'title':1,'status':1,'_id':1})
			.sort({'updated_at': -1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					Warning.find({'user_was_warning':ObjectID(artistId)})
					.sort({'created_at':-1})
					.exec(function(err,data1){
						if(err){
							res.json({message:err})
						}else{
								var end1 = JSON.stringify(data1);
								res.render('./artist/character', {topicCharacter: JSON.parse(end),warning: JSON.parse(end1),total:data1.length});
								
						}
					})
					
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
		if(req.session.position === 1){
			var artistId = req.session._id;
			Topic.find({'artistId':ObjectID(artistId),'category':'Sticker'},{'title':1,'status':1,'_id':1})
			.sort({'updated_at': -1})
			.limit(10)
			.exec(function(err,data){
				if(err){
					res.json({message:err})
				}else{
					var end = JSON.stringify(data);
					Warning.find({'user_was_warning':ObjectID(artistId)})
					.sort({'created_at':-1})
					.exec(function(err,data1){
						if(err){
							res.json({message:err})
						}else{
								var end1 = JSON.stringify(data1);
								res.render('./artist/sticker', {topicSticker: JSON.parse(end),warning: JSON.parse(end1),total:data1.length});
								
						}
					})
				}
			})
		}else{
			res.redirect('/');
		}
	}

})

router.route('/signup')
.post(function(req,res){
	var newUser = new User({
		email : req.body.email,
		username : req.body.username,
		password: req.body.password,
		position : 1,
		alert:0,
		avatar:'http://res.cloudinary.com/uet/image/upload/v1504288857/v3uuy6d2xncs3g6753lz.jpg'
	})
	newUser.save(function(err){
		if(err){
			res.json({message: err})
		}else{
			res.cookie('CookieEmail', req.body.email, {maxAge:3600*24*1000, httpOnly: true})
				res.cookie('CookiePassword', req.body.password, {maxAge:3600*24*1000, httpOnly: true})
			res.json({message:'success'})
		}
	})
})

router.route('/login')
.post(function(req,res){

	User.findOne({'email':req.body.email,'password':req.body.password})
	.exec(function(err, value){
		if (err) {
			alert('Loi dang nhap');
		}else{
			if(value != null){
				res.cookie('CookieEmail', req.body.email, {maxAge:3600*24*1000, httpOnly: true})
				res.cookie('CookiePassword', req.body.password, {maxAge:3600*24*1000, httpOnly: true})
				req.session.position = value.position;
				req.session.username = value.username;
				req.session.avatar = value.avatar;
				req.session.email=value.email;
				req.session.password = req.body.password;
				req.session._id = value._id;
				if(req.session.position === 1){
					res.redirect('/home');
				}else{
					if(req.session.position === 2){
						res.redirect('/approval/home')
					}else{
						if(req.session.position === 3)
						res.redirect('/admin/home')
					}
				}
				
			}
		}
	})
	
})

router.route('/logout')
.get(function(req,res){
  req.session.destroy();
  res.redirect('/');
})
module.exports = router