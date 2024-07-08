const bcryptjs = require("bcryptjs");
const { userModel } = require("../database/schemas/User");

const createNewUser = async (user) => {
	try {
		const isUserPresent =
			await userModel.isUserPresentWithEmailOrUsername(
				user.emailId,
				user.username
			);
		if (isUserPresent === 1) {
			return {
				status: 400,
				message: "User already present with emailId",
			};
		}
		if (isUserPresent === 2) {
			return {
				status: 400,
				message: "User already present with username",
			};
		}
		const newuser = new userModel({
			...user,
			password: bcryptjs.hashSync(
				user.password,
				bcryptjs.genSaltSync(10)
			),
		});
		const savedUser = await newuser.save();
		return {
			status: 201,
			message: "User created",
			body: {
				name: savedUser.name,
				username: savedUser.username,
				emailId: savedUser.emailId,
				phoneNumber: savedUser.phoneNumber,
			},
		};
	} catch (error) {
		return {
			status: 500,
			message: error.message,
		};
	}
};

const login = async (emailId, password) => {
	try {
		const user = await userModel.findOne({ emailId });
		if (user === null) {
			return {
				status: 404,
				message: "No user found with the provided email",
			};
		}
		if (!bcryptjs.compareSync(password, user.password)) {
			return {
				status: 400,
				message: "Incorrect password",
			};
		}
		const token = await user.generateTokenForUser();
		const savedUser = await user.save();
		return {
			status: 200,
			body: {
				name: savedUser.name,
				username: savedUser.username,
				emailId: savedUser.emailId,
				phoneNumber: savedUser.phoneNumber,
			},
			token,
		};
	} catch (error) {
		return {
			status: 500,
			message: "Internal server error",
		};
	}
};

const addNewPasswordToCurrentUser = async (username, url, password) => {
	try {
		const passwordObject = { url, password };
		const user = await userModel.findOne({ username });
		user.addNewPassword(passwordObject);
		const savedUser = await user.save();
		return {
			status: 200,
			body: {
				name: savedUser.name,
				username: savedUser.username,
				emailId: savedUser.emailId,
				phoneNumber: savedUser.phoneNumber,
				_passwords: savedUser._passwords,
			},
		};
	} catch (error) {
		return {
			status: 500,
			message: "Internal server error",
		};
	}
};

module.exports = { createNewUser, login, addNewPasswordToCurrentUser };
