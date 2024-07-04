const { Schema, model } = require("mongoose");
const { generateToken } = require("../../service/authService");
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
	// _passwords
	_tokens: [
		{
			type: String,
		},
	],
});

userSchema.methods.generateTokenForUser = async function () {
	const user = this;
	const token = generateToken(user.username);
	user._tokens = user._tokens.concat(token);
	return token;
};

const userModel = model("User", userSchema);

module.exports = { userModel };
