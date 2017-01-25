var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	username: {type: String, default: ''},
	password: {type: String, default: ''},
	timestamp: {type: Date, default: Date.now}
});

ProfileSchema.methods.summary = function(){
	var summary = {
		username: this.username,
		timestamp: this.timestamp,
		id: this._id.toString()
	}
	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)