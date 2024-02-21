import mongoose from "mongoose";
const URI = "mongodb://192.168.0.21:27017/vue-db";

mongoose.connect(URI);

export default mongoose.connection;
