import {getAllProducts, getProductById} from "../actions/productsActions";

export async function handleGetProductById(req, res) {
	try {
		const productId = req.params.productId;
		const product = await getProductById(productId);
		res.status(200).json(product);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleGetAllProducts(_, res) {
	try {
		const products = await getAllProducts();
		res.status(200).json(products);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}
