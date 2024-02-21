import db from "../db";

export async function getAllProducts() {
	try {
		const products = await db.collection("products").find().toArray();
		return products;
	} catch (e) {
		throw e;
	}
}

export async function getProductById(productId) {
	try {
		const product = await db.collection("products").findOne({id: productId});
		return product;
	} catch (e) {
		throw e;
	}
}
