const express = require("express");
require("dotenv").config();
require("./database/connect");

const { establishConnectionToDatabase } = require("./database/connect");

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION_URL;

establishConnectionToDatabase(DATABASE_CONNECTION_URL);

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
