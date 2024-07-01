const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	emailId: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
	},
});

const userModel = model("User", userSchema);

module.exports = { userModel };
