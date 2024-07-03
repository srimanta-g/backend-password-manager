const { Router } = require("express");
const { createNewUser, login } = require("../service/userService");
const { verifyAuthTokenMiddleware } = require("../middleware/authMiddleware");

const userRouter = Router();

userRouter.post("/users/signup", async (request, response) => {
	try {
		const result = await createNewUser(request.body);
		if (result.status === 201) {
			response.status(201).send(result);
		} else if (result.status === 400) {
			response.status(400).send(result);
		} else {
			response.status(500).send({
				status: 500,
				message: "Something went wrong........",
				body: result,
			});
		}
	} catch (error) {
		console.log(error);
	}
});

userRouter.post("/users/login", async (request, response) => {
	try {
		const result = await login(
			request.body.emailId,
			request.body.password
		);
		response.cookie("token", result.token);
		response.status(200).send({ body: result.body });
	} catch (error) {
		console.log(error);
	}
});

userRouter.get(
	"/users/securedPath/:username",
	verifyAuthTokenMiddleware,
	(request, response) => {
		try {
			response.send("ok");
		} catch (error) {
			response.send({
				error: error.message,
			});
		}
	}
);

module.exports = { userRouter };
