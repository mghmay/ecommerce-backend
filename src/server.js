import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {productsRouter} from "./routes/productsRouter";
import {usersRouter} from "./routes/usersRouter";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
	console.log("listening on port " + port);
});
