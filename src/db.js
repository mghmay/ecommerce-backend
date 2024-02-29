import mongoose from "mongoose";
const URI = "mongodb://localhost:27017/vue-db";

mongoose.connect(URI);

export default mongoose.connection;
