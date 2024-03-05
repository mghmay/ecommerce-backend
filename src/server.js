import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {router} from "./routes/router";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use("/api", router);

app.listen(port, () => {
	console.log("listening on port " + port);
});
