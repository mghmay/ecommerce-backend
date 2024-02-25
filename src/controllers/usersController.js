import {getCart, addToCart, removeFromCart} from "../actions/usersActions";

export async function handleGetCart(req, res) {
	try {
		const {userId} = req.params;
		const usersCart = await getCart(userId);

		res.status(200).json(usersCart);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleAddToCart(req, res) {
	try {
		const {userId} = req.params;
		const {bookId} = req.body;
		await addToCart(userId, bookId);
		const usersCart = await getCart(userId);

		res.status(200).json(usersCart);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleRemoveFromCart(req, res) {
	try {
		const {userId, bookId} = req.params;
		await removeFromCart(userId, bookId);
		const usersCart = await getCart(userId);

		res.status(200).json(usersCart);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}
