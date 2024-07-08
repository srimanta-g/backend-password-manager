const { Schema, model } = require("mongoose");
const { generateToken } = require("../../service/authService");
const { passwordSchema } = require("./Password");
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
	_passwords: [passwordSchema],
	_tokens: [
		{
			token: {
				type: String,
			},
		},
	],
});

userSchema.methods.generateTokenForUser = async function () {
	const user = this;
	const token = generateToken(user.username);
	user._tokens = user._tokens.concat({ token });
	return token;
};

userSchema.methods.addNewPassword = function (password) {
	const user = this;
	user._passwords = user._passwords.concat(password);
};

userSchema.statics.isUserPresentWithEmailOrUsername = async function (
	emailId,
	username
) {
	let user = await this.findOne({ emailId });
	if (user) return 1;
	user = await this.findOne({ username });
	if (user) return 2;

	return 0;
};

const userModel = model("User", userSchema);

module.exports = { userModel };
