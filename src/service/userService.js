const { userModel } = require("../database/schemas/User");

const createNewUser = async (user) => {
	const newuser = new userModel({
		name: "Srimanta",
		password: "1234",
		username: "srimantaganguly02",
		emailId: "srimantaganguly02@gmail.com",
	});
	try {
		return await newuser.save();
	} catch (error) {
		return error.message;
	}
};

module.exports = { createNewUser };
