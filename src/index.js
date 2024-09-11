const express = require("express");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./router/userRouter");
const cors = require("cors");
require("dotenv").config();
require("./database/connect");

const { establishConnectionToDatabase } = require("./database/connect");

const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);
const DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION_URL;

establishConnectionToDatabase(DATABASE_CONNECTION_URL);

app.use(express.json());
app.use(cors({ credentials: true, origin: "*", withCredentials: true }));
app.use(cookieParser());
app.use(userRouter);

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
