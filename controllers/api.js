var express 	= require('express');
var app 		= express();
var router 		= express.Router();
var multer 		= require('multer')
var fs 			= require('fs');
var User 		= require('../models/user');
var Background 	= require('../models/background');
var Character 	= require('../models/character')
var Sticker 	= require('../models/sticker')
var Topic 		= require('../models/topic')
var Warning 	= require('../models/warning')
var ObjectID 	= require('mongodb').ObjectID;
var cloudinary = require('cloudinary')
var Feadback = require('../models/feedback');

router.route('/feedback')
.post(function(req,res){
	var newFeedback = new Feadback({
		content : req.body.content,
		url : req.session.avatar,
		user_feedback: req.session._id
	})
	newFeedback.save(function(err){
		if(err) throw err;
		else res.redirect('/sticker');
	})

})


router.route('/resetpass')
.put(function(req,res){
	User.update({'_id' : ObjectID(req.session._id)},{'password':req.body.password}, function(err,result){
		if(err) throw err;
		else res.send(JSON.stringify(result));
	})
})

router.route('/addTopicBackground')
.post(function(req,res){
	var newTopicBackground = new Topic({
		title: req.body.title,
		artistId : req.session._id,
		status: 0,
		category: "Background"
	})
	newTopicBackground.save(function(err, result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.send(JSON.stringify(result))
		}
	})
})
router.route('/addTopicCharacter')
.post(function(req,res){
	var newTopicCharacter = new Topic({
		title: req.body.title,
		artistId : req.session._id,
		status: 0,
		category: "Character"
	})
	newTopicCharacter.save(function(err, result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.send(JSON.stringify(result))
		}
	})
})

router.route('/addTopicSticker')
.post(function(req,res){
	var newTopicSticker = new Topic({
		title: req.body.title,
		artistId : req.session._id,
		status: 0,
		category: "Sticker"
	})
	newTopicSticker.save(function(err, result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.send(JSON.stringify(result))
		}
	})
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage });

var upload1 = multer({storage:storage});


router.route('/addBackground')
.post(upload.array("file",12), function(req,res)
{
	var arr = req.files;
	var title = req.body.title;
	var topicId = req.body.topicId;
	Background.update({'_id':ObjectID(req.body.topicId)}, {'status' : 0},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			var chk = true
			for (var i = 0; i < arr.length; i++) {
				cloudinary.uploader.upload("./public/image/"+ arr[i].originalname, function(result) { 
				
				  	var newBackground = new Background({
						topicId : topicId,
						url : result.url,
						public_id : result.public_id,
						status: 0
					});

					newBackground.save(function(error){
						if(error){
							console.log(error);
							chk = false;
						}
					})
				});
				fs.unlink("./public/image/"+ arr[i].originalname, function (err) {
					if (err) throw err;
					  console.log('File deleted!');
				});				
			}
			if(chk){	

				res.redirect('/background');

			}
		}
	})
			
				
	
})

router.route('/addCharacter')
.post(upload.array("file",12), function(req,res)
{
	var arr = req.files;
	var title = req.body.title;
	var topicId = req.body.topicId;
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'status' : 0},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			var chk = true
	for (var i = 0; i < arr.length; i++) {
		cloudinary.uploader.upload("./public/image/"+ arr[i].originalname, function(result) {
			var newCharacter = new Character({
				topicId : topicId,
				public_id : result.public_id,
				url : result.url,
				status: 0
			});

			newCharacter.save(function(error){
				if(error){
					console.log(error);
					chk = false;
				}
			})
		})
			fs.unlink("./public/image/"+ arr[i].originalname, function (err) {
					if (err) throw err;
					  console.log('File deleted!');
				});	
		
	}
	if(chk){	
				res.redirect('/character');		
	}
		}
	})
	

})
router.route('/addSticker')
.post(upload.array("file",12), function(req,res)
{
	var arr = req.files;
	var title = req.body.title;
	var topicId = req.body.topicId;
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'status' : 0},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			var chk = true
			for (var i = 0; i < arr.length; i++) {
				cloudinary.uploader.upload("./public/image/"+ arr[i].originalname, function(result) {
					var newSticker = new Sticker({
					topicId : topicId,
					public_id : result.public_id,
					url : result.url,
					status: 0
					});

					newSticker.save(function(error){
						if(error){
							console.log(error);
							chk = false;
						}
					})
				})	
					fs.unlink("./public/image/"+ arr[i].originalname, function (err) {
					if (err) throw err;
					  console.log('File deleted!');
				});			
			}
			if(chk){	
				res.redirect('/sticker');		
			}
		}
	})
	

})

// router.post('/changeinfo',upload1.single('file'),function(req,res){
// 	var username = req.body.usernamechange;
// 	if(req.files == null || req.files == 'undefined'){
// 		User.update({'_id': ObjectID(req.session._id)}, {'username':username},function(err, results){
// 			if(err) throw err;
// 			else console.log(results)
// 		})
// 		req.session.username = req.body.usernamechange;
// 	}else{
// 		cloudinary.uploader.upload("./public/image/"+ req.files.originalname, function(result) { 
// 		User.update({'_id': ObjectID(req.session._id)}, {'username':username,'avatar':result.url},function(err, results){
// 			if(err) throw err;
// 			else console.log(results)
// 		})
// 		req.session.avatar = result.url;
// 		req.session.username = req.body.usernamechange;
// 		})
// 		fs.unlink("./public/image/"+ req.files.originalname, function (err) {
// 			if (err) throw err;
// 			  console.log('File deleted!');
// 		});	
		
// 	}
	
// 	if(req.session.position === 1){
// 		res.redirect('/home');
// 	}else{
// 		if(req.session.position === 2){
// 			res.redirect('/approval/home')
// 		}else{
// 			if(req.session.position === 3)
// 			res.redirect('/admin/home')
// 		}
// 	}
// })


router.route('/deleteBackground')
.delete(function(req,res){
	var id = req.body.backgroundId;
	var url = req.body.backgroundUrl;
	var public = req.body.public_id;
	Background.deleteOne({'_id' :  ObjectID(id)}, function(err){
			if(err){
			res.json({message: err})
		}else{	

			cloudinary.uploader.destroy(public, function(result) { 
				res.json({message: 'success'}) 
			});
			
		}
	})
})


router.route('/deleteCharacter')
.delete(function(req,res){
	var id = req.body.characterId;
	var url = req.body.characterUrl;
	var public = req.body.public_id;
	Character.deleteOne({'_id' :  ObjectID(id)}, function(err){
			if(err){
			res.json({message: err})
		}else{		
			cloudinary.uploader.destroy(public, function(result) { 
				res.json({message: 'success'}) 
			});
		}
	})
})

router.route('/deleteSticker')
.delete(function(req,res){
	var id = req.body.stickerId;
	var url = req.body.stickerUrl;	
	var public = req.body.public_id;	
	Sticker.deleteOne({'_id' :  ObjectID(id)}, function(err){
		if(err){
			res.json({message: err})
		}else{			
			cloudinary.uploader.destroy(public, function(result) { 
				res.json({message: 'success'}) 
			});
		}
	})
})

router.route('/getTopicBackground')
.get(function(req,res){
	var topicId = req.query.topicId;
	Background.find({'topicId' : ObjectID(topicId)},function(err, data){
		if(err){
			res.json({message: 'err'});
		}else{
			res.send(JSON.stringify(data));
		}
	})
})
router.route('/getTopicCharacter')
.get(function(req,res){
	var topicId = req.query.topicId;
	Character.find({'topicId' : ObjectID(topicId)},function(err, data){
		if(err){
			res.json({message: 'err'});
		}else{
			res.send(JSON.stringify(data));
		}
	})
})
router.route('/getTopicSticker')
.get(function(req,res){
	var topicId = req.query.topicId;
	Sticker.find({'topicId' : ObjectID(topicId)},function(err, data){
		if(err){
			res.json({message: 'err'});
		}else{
			res.send(JSON.stringify(data));
		}
	})
})
//Edit user Aritst 
router.route('/EditUserAutist')
.post(function(req,res){
	User.update({'_id':ObjectID(req.body.user_id)}, {'email':req.body.email,'password':req.body.password, 'username':req.body.username},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.redirect('/admin/userartist');
		}
	})
})
router.route('/deleteUserArtist')
.delete(function(req,res){
	var user_id = req.body.user_id;
	console.log('done');
	User.deleteOne({'_id':ObjectID(user_id)}, function(err,result){
		if(err){
			res.json({message: err})
		}else{
			
			res.json({message: 'success'})
		}
	})
})

router.route('/EditUserApproval')
.post(function(req,res){
	User.update({'_id':ObjectID(req.body.user_id)}, {'email':req.body.email,'password':req.body.password, 'username':req.body.username},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.redirect('/admin/userapproval');
		}
	})
})
router.route('/deleteUserApproval')
.delete(function(req,res){
	var user_id = req.body.user_id;
	User.deleteOne({'_id':ObjectID(user_id)}, function(err,result){
		if(err){
			res.json({message: err})
		}else{
			
			res.json({message: 'success'})
		}
	})
})

router.route('/addUserApproval')
.post(function(req,res){
	var newUser = new User({
		email : req.body.email,
		username : req.body.username,
		password: req.body.password,
		position : 2,
		avatar:'http://res.cloudinary.com/uet/image/upload/v1504288857/v3uuy6d2xncs3g6753lz.jpg'
	})
	newUser.save(function(err){
		if(err){
			res.json({message: err})
		}else{
			res.json({message:'success'})
		}
	})
})


router.route('/addUserArtist')
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
			res.json({message:'success'})
		}
	})
})



router.route('/confirmOkBackground')
.put(function(req,res){
	Background.update({'_id':ObjectID(req.body.backgroundId)}, {'status' : 2},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

router.route('/confirmOkCharacter')
.put(function(req,res){
	Character.update({'_id':ObjectID(req.body.characterId)}, {'status' : 2},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})
router.route('/confirmOkSticker')
.put(function(req,res){
	Sticker.update({'_id':ObjectID(req.body.stickerId)}, {'status' : 2},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

router.route('/confirmAlertBackground')
.put(function(req,res){
	var newWarning = new Warning({
				user_warning: req.session._id,
				user_was_warning: req.body.artistId,
				content: req.body.content,
				url: req.body.url
	}) 
	newWarning.save(function(err, result){
		if(err) {
			console.log(err)
		}else{
			console.log('thanh cong');
		}
	})

	User.find({'_id' : ObjectID(req.body.artistId)},{'alert':1})
	.exec(function(err,data){
		if(err) {
			console.log(err)
		}else{
			if(data != null){
				var x = parseInt(data[0].alert) + 1;
				User.update({'_id':ObjectID(req.body.artistId)}, {'alert':x}, function(err, result){
					if (err) {console.log(err)}
					else{console.log('success')};
				})
			}
		}
		
	})

	Background.update({'_id':ObjectID(req.body.backgroundId)}, {'status' : 3},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

router.route('/confirmAlertCharacter')
.put(function(req,res){
	var newWarning = new Warning({
				user_warning: req.session._id,
				user_was_warning: req.body.artistId,
				content: req.body.content,
				url: req.body.url
	}) 
	newWarning.save(function(err, result){
		if(err) {
			console.log(err)
		}else{
			console.log('thanh cong');
		}
	})
	User.find({'_id' : ObjectID(req.body.artistId)},{'alert':1})
	.exec(function(err,data){
		if(err) {
			console.log(err)
		}else{
			if(data != null){
				var x = parseInt(data[0].alert) + 1;
				User.update({'_id':ObjectID(req.body.artistId)}, {'alert':x}, function(err, result){
					if (err) {console.log(err)}
					else{console.log('success')};
				})
			}
		}
		
	})

	Character.update({'_id':ObjectID(req.body.characterId)}, {'status' : 3},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})
router.route('/confirmAlertSticker')
.put(function(req,res){
	var newWarning = new Warning({
				user_warning: req.session._id,
				user_was_warning: req.body.artistId,
				content: req.body.content,
				url: req.body.url
	}) 
	newWarning.save(function(err, result){
		if(err) {
			console.log(err)
		}else{
			console.log('thanh cong');
		}
	})

	User.find({'_id' : ObjectID(req.body.artistId)},{'alert':1})
	.exec(function(err,data){
		if(err) {
			console.log(err)
		}else{
			if(data != null){
				var x = parseInt(data[0].alert) + 1;
				User.update({'_id':ObjectID(req.body.artistId)}, {'alert':x}, function(err, result){
					if (err) {console.log(err)}
					else{console.log('success')};
				})
			}
		}
		
	})

	Sticker.update({'_id':ObjectID(req.body.stickerId)}, {'status' : 3},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

router.route('/confirmBackground')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'status' : 1},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

router.route('/confirmCharacter')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'status' : 1},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})
router.route('/confirmSticker')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'status' : 1},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

//Chinh sua title Background cua Artist
router.route('/editTopicBackground')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'title' : req.body.title},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

//Xoa Background cua Artist
router.route('/deleteTopicBackground')
.delete(function(req,res){
	Topic.deleteOne({'_id':ObjectID(req.body.topicId)} ,function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			Background.find({'topicId':req.body.topicId})
			.exec(function(err, value){
				if (err) {
					console.log(err);
				}else{
					if(value != null){
						for(var i in value){
							
							Background.deleteOne({'_id':ObjectID(value[i]._id)},function(err){
								if(err) throw err;
								
							})
							cloudinary.uploader.destroy(value[i].public_id, function(result) { 
								console.log(result)
							});
						}
						
					}
				}
			})
			
			res.json({message:'success'})
		}
	})
})

//Chinh sua title Character cua Artist
router.route('/editTopicCharacter')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'title' : req.body.title},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

//Xoa Character cua Artist
router.route('/deleteTopicCharacter')
.delete(function(req,res){
	Topic.deleteOne({'_id':ObjectID(req.body.topicId)} ,function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			Character.find({'topicId':req.body.topicId})
			.exec(function(err, value){
				if (err) {
					console.log(err);
				}else{
					if(value != null){
						for(var i in value){
							Character.deleteOne({'_id':ObjectID(value[i]._id)},function(err){
								if(err) throw err;
								
							})
							cloudinary.uploader.destroy(value[i].public_id, function(result) { 
								console.log(result)
							});
						}
						
					}
				}
			})
			res.json({message:'success'})
		}
	})
})

//Chinh sua title Sticker cua Artist
router.route('/editTopicSticker')
.put(function(req,res){
	Topic.update({'_id':ObjectID(req.body.topicId)}, {'title' : req.body.title},function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			res.json({message:'success'})
		}
	})
})

//Xoa Sticker cua Artist
router.route('/deleteTopicSticker')
.delete(function(req,res){
	Topic.deleteOne({'_id':ObjectID(req.body.topicId)} ,function(err,result){
		if(err){
			res.JSON({message : 'err'})
		}else{
			Sticker.find({'topicId':req.body.topicId})
			.exec(function(err, value){
				if (err) {
					console.log(err);
				}else{
					if(value != null){
						for(var i in value){
							Sticker.deleteOne({'_id':ObjectID(value[i]._id)},function(err){
								if(err) throw err;
								
							})
							cloudinary.uploader.destroy(value[i].public_id, function(result) { 
									console.log(result)
								});
						}
						
					}
				}
			})
			res.json({message:'success'})
		}
	})
})



module.exports = router
