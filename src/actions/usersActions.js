import db from "../db";

export async function getCart(userId) {
	try {
		const user = await db.collection("users").findOne({id: userId});
		if (!user) throw new Error("This user doesn't exist!");

		return user.cartItems;
	} catch (e) {
		throw e;
	}
}

export async function addToCart(userId, productId) {
	try {
		const user = await db.collection("users").findOne({id: userId});
		if (!user) throw new Error("This user doesn't exist!");
		const product = await db.collection("products").findOne({id: productId});
		if (!product) throw new Error("This product doesn't exist!");

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
	} catch (e) {
		throw e;
	}
}

export async function removeFromCart(userId, productId) {
	try {
		const user = await db.collection("users").findOne({id: userId});
		if (!user) throw new Error("This user doesn't exist!");
		const product = await db.collection("products").findOne({id: productId});
		if (!product) throw new Error("This product doesn't exist!");

		const userCart = user.cartItems;

		const item = userCart.find((item) => item.product.id === productId);
		if (item === undefined) throw new Error("This item isn't in the cart!");

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
	} catch (e) {
		throw e;
	}
}
