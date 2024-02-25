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

export async function addToCart(userId, bookId) {
	try {
		const user = await db.collection("users").findOne({id: userId});
		if (!user) throw new Error("This user doesn't exist!");
		const book = await db.collection("books").findOne({id: bookId});
		if (!book) throw new Error("This book doesn't exist!");

		const userCart = user.cartItems;

		const item =
			userCart.length > 0
				? userCart.find((item) => item.book.id === bookId)
				: undefined;

		if (item) {
			const amount = item.amount;
			await db
				.collection("users")
				.updateOne(
					{id: userId, "cartItems.book.id": bookId},
					{$set: {"cartItems.$.amount": amount + 1}}
				);
		} else {
			await db.collection("users").updateOne(
				{id: userId},
				{
					$push: {cartItems: {book, amount: 1}},
				}
			);
		}
	} catch (e) {
		throw e;
	}
}

export async function removeFromCart(userId, bookId) {
	try {
		const user = await db.collection("users").findOne({id: userId});
		if (!user) throw new Error("This user doesn't exist!");
		const book = await db.collection("books").findOne({id: bookId});
		if (!book) throw new Error("This book doesn't exist!");

		const userCart = user.cartItems;

		const item = userCart.find((item) => item.book.id === bookId);
		if (item === undefined) throw new Error("This item isn't in the cart!");

		if (item.amount > 1) {
			const amount = item.amount;
			await db
				.collection("users")
				.updateOne(
					{id: userId, "cartItems.book.id": bookId},
					{$set: {"cartItems.$.amount": amount - 1}}
				);
		} else {
			await db.collection("users").updateOne(
				{id: userId},
				{
					$pull: {cartItems: {"book.id": bookId}},
				}
			);
		}
	} catch (e) {
		throw e;
	}
}
