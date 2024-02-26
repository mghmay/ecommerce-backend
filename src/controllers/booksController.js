import {
	getAllBooks,
	getBookById,
	getBooksByGenre,
	updateBook,
} from "../actions/booksActions";

export async function handleGetBookById(req, res) {
	try {
		const {bookId} = req.params;
		const book = await getBookById(bookId);
		res.status(200).json(book);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleGetAllBooks(_, res) {
	try {
		const books = await getAllBooks();
		res.status(200).json(books);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleGetBooksByGenre(req, res) {
	try {
		const {genre} = req.params;
		const books = await getBooksByGenre(genre);
		res.status(200).json(books);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

export async function handleUpdateBook(req, res) {
	try {
		const {bookId} = req.params;
		const {field, content} = req.body;
		const book = await updateBook(bookId, field, content);
		res.status(200).json(book);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}
