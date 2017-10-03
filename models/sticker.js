var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_Sticker = new Schema({
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref : 'Topic'
	} ,
	url : String,
	public_id : String, //Luu id cua anh
	status : Number
});
module.exports = mongoose.model('Sticker', Schema_Sticker);
