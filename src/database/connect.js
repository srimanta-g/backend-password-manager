const mongoose = require("mongoose");

async function establishConnectionToDatabase(connectionURL) {
	try {
		await mongoose.connect(connectionURL);
		console.log("Databse connected");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

module.exports = { establishConnectionToDatabase };
