var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema_Warning = Schema({
	user_warning :{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	user_was_warning:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	url : String, //Hình ảnh cảnh báo
	content : String, //Nội dung cảnh báo
	created_at : Date,
	updated_at:Date
})
Schema_Warning.pre('save',function(next){
	var cur = new Date().toISOString()
	this.updated_at = cur;
	if(!this.created_at){
		this.created_at = cur;
		next();
	}
});

module.exports = mongoose.model('Warning', Schema_Warning);