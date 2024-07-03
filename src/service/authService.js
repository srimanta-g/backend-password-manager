const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload) => {
	return jwt.sign(payload, SECRET_KEY);
};

const decodeToken = (token) => {
	return jwt.decode(token, SECRET_KEY);
};

module.exports = { generateToken, decodeToken };
