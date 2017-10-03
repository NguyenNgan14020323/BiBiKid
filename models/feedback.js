var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema_Feedback = Schema({
	user_feedback :{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	url : String, //Hình ảnh cảnh báo
	content : String, //Nội dung cảnh báo
	created_at : Date,
	updated_at:Date
})
Schema_Feedback.pre('save',function(next){
	var cur = new Date().toISOString()
	this.updated_at = cur;
	if(!this.created_at){
		this.created_at = cur;
		next();
	}
});

module.exports = mongoose.model('Feedback', Schema_Feedback);