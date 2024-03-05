import mongoose from "mongoose";
import "dotenv/config";

const password = process.env.MONGODB_PASSWORD;
const username = process.env.MONGODB_USERNAME;
const URI =
	process.env.DEV === "true"
		? process.env.DEV_URI
		: `mongodb+srv://${username}:${password}@books-api.7qhcvvg.mongodb.net/vue-db?retryWrites=true&w=majority&appName=books-api`;

mongoose.connect(URI);

export default mongoose.connection;
