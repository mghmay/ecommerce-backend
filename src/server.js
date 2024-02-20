import express from "express";
import bodyParser from "body-parser";
import {MongoClient} from "mongodb";
import path from "path";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../assets")));

app.get("/api/products", async (req, res) => {
	const client = await MongoClient.connect("mongodb://192.168.0.21:27017");
	const db = client.db("vue-db");
	const products = await db.collection("products").find().toArray();
	res.status(200).json(products);
	client.close();
});

app.post("/api/users/:userId/cart", async (req, res) => {
	const client = await MongoClient.connect("mongodb://192.168.0.21:27017");
	const db = client.db("vue-db");

	const {userId} = req.params;
	const {productId} = req.body;

	const user = await db.collection("users").findOne({id: userId});
	if (!user) return res.status(404).json("Could not find the user");

	const product = await db.collection("products").findOne({id: productId});
	if (!product) return res.status(404).json("Could not find the product");

	const userCart = user.cartItems;

	const item =
		userCart.length > 0
			? userCart.find((item) => item.product.id === productId)
			: undefined;

	if (item) {
		const amount = item.amount;
		await db
			.collection("users")
			.updateOne(
				{id: userId, "cartItems.product.id": productId},
				{$set: {"cartItems.$.amount": amount + 1}}
			);
	} else {
		await db.collection("users").updateOne(
			{id: userId},
			{
				$push: {cartItems: {product, amount: 1}},
			}
		);
	}
	const updatedUser = await db.collection("users").findOne({id: userId});

	res.status(200).json(updatedUser.cartItems);
});

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
	const client = await MongoClient.connect("mongodb://192.168.0.21:27017");
	const db = client.db("vue-db");
	const {userId, productId} = req.params;

	const user = await db.collection("users").findOne({id: userId});
	if (!user) return res.status(404).json("could not find user");

	const product = await db.collection("products").findOne({id: productId});
	if (!product) return res.status(404).json("Could not find the product");

	const userCart = user.cartItems;

	const item = userCart.find((item) => item.product.id === productId);
	if (!item) return res.status(404).json("Could not find the product");

	if (item.amount > 1) {
		const amount = item.amount;
		await db
			.collection("users")
			.updateOne(
				{id: userId, "cartItems.product.id": productId},
				{$set: {"cartItems.$.amount": amount - 1}}
			);
	} else {
		await db.collection("users").updateOne(
			{id: userId},
			{
				$pull: {cartItems: {"product.id": productId}},
			}
		);
	}

	const updatedUser = await db.collection("users").findOne({id: userId});
	const updatedCartItems = updatedUser.cartItems;

	res.status(200).json(updatedCartItems);
	client.close();
});

app.get("/api/users/:userId/cart", async (req, res) => {
	const client = await MongoClient.connect("mongodb://192.168.0.21:27017");
	const db = client.db("vue-db");

	const userId = req.params.userId;

	const user = await db.collection("users").findOne({id: userId});
	if (!user) return res.status(404).json("could not find user");

	res.status(200).json(user.cartItems);

	client.close();
});

app.get("/api/products/:productId", async (req, res) => {
	const client = await MongoClient.connect("mongodb://192.168.0.21:27017");
	const db = client.db("vue-db");
	const product = await db
		.collection("products")
		.findOne({id: req.params.productId});

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404).json("Could not find the product");
	}
	client.close();
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
