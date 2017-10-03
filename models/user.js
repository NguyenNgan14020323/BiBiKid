var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema_User = new Schema({
	email : String,
	username : String,
	password : String,
	position : Number, //Chức vụ của người dùng
	avatar: String,
	alert : Number, //Số lượng bị cảnh báo
	created_at : Date,
	updated_at : Date
});

Schema_User.pre('save',function(next){
	var cur = new Date().toISOString()
	this.updated_at = cur;
	if(!this.created_at){
		this.created_at = cur;
		next();
	}
});

module.exports = mongoose.model('User', Schema_User);
