const { Schema } = require("mongoose");

const passwordSchema = new Schema({
	url: {
		type: String,
	},
	password: {
		type: String,
	},
});

module.exports = { passwordSchema };
