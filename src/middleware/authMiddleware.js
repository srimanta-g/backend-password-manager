const { decodeToken } = require("../service/authService");

const verifyAuthTokenMiddleware = async (request, response, next) => {
	const username = request.params.username;
	try {
		const token = request.cookies.token;
		const decodedUsername = decodeToken(token);
		if (username !== decodedUsername || token === undefined) {
			response.status(403).send({
				status: 403,
				message: "Authentication Failed",
			});
		}
	} catch (error) {
		throw new Error(error.message);
	}
	next();
};

module.exports = { verifyAuthTokenMiddleware };
