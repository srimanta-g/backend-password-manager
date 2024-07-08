const { userModel } = require("../database/schemas/User");
const { decodeToken } = require("../service/authService");

const verifyAuthTokenMiddleware = async (request, response, next) => {
	const username = request.params.username;
	try {
		const token = request.cookies.token;
		const decodedUsername = decodeToken(token);
		const user = await userModel.findOne({
			username,
			"_tokens.token": token,
		});
		if (
			username !== decodedUsername ||
			token === undefined ||
			user === null
		) {
			throw "Authentication Error";
		}
	} catch (error) {
		response.status(403).send({ message: error });
	}
	next();
};

module.exports = { verifyAuthTokenMiddleware };
