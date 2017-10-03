//Đây là nơi lưu trữ bộ sticker theo từng category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_Topic = new Schema({
	title : String, //Tiêu đề của bộ Sticker
	artistId :{
		 type: mongoose.Schema.Types.ObjectId,
	     ref : 'User' //id của tác giả upload nên
	},
	status : Number, // 0-waitting, 1: confirm
	category : String,
	created_at : Date,
	updated_at : Date
})
Schema_Topic.pre('save',function(next){
		var cur = new Date().toISOString()
		this.updated_at = cur;
		if(!this.created_at){
			this.created_at = cur;
			next();
		}
});

module.exports = mongoose.model('Topic', Schema_Topic);
