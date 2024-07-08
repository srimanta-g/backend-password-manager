const { Router } = require("express");
const {
	createNewUser,
	login,
	addNewPasswordToCurrentUser,
	deletePasswordFromUser,
	logout,
} = require("../service/userService");
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
		if (result.status !== 200) {
			response
				.status(result.status)
				.send({ message: result.message });
		} else {
			response.cookie("token", result.token);
			response.status(result.status).send({ body: result.body });
		}
	} catch (error) {
		console.log(error.message);
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

userRouter.post(
	"/users/add-new-password/:username",
	verifyAuthTokenMiddleware,
	async (request, response) => {
		try {
			const result = await addNewPasswordToCurrentUser(
				request.params.username,
				request.body.url,
				request.body.password
			);
			if (result.status !== 200) {
				response
					.status(result.status)
					.send({ error: result.message });
			} else {
				response.status(result.status).send({
					body: result.body,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	}
);

userRouter.delete(
	"/users/delete-password/:username/:passwordId",
	verifyAuthTokenMiddleware,
	async (request, response) => {
		try {
			const result = await deletePasswordFromUser(
				request.params.username,
				request.params.passwordId
			);
			if (result.status !== 200) {
				response
					.status(result.status)
					.send({ error: result.message });
			} else {
				response.status(result.status).send({
					body: result.body,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	}
);

userRouter.post(
	"/users/:username/log-out",
	verifyAuthTokenMiddleware,
	async (request, response) => {
		try {
			const username = request.params.username;
			const token = request.cookies.token;
			await logout(username, token);
			return response
				.status(200)
				.send({ message: "User Successfully Logged Out" });
		} catch (error) {
			console.log(error.message);
		}
	}
);

module.exports = { userRouter };
