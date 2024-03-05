import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {booksRouter} from "./routes/booksRouter";
import {usersRouter} from "./routes/usersRouter";
import {genresRouter} from "./routes/genresRouter";
import "dotenv/config";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/genres", genresRouter);

app.listen(port, () => {
	console.log("listening on port " + port);
});
