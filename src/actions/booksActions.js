import db from "../db";

export async function getAllBooks() {
	try {
		const books = await db.collection("books").find().toArray();
		if (!books) throw new Error("This book doesn't exist!");

		return books;
	} catch (e) {
		throw e;
	}
}

export async function getBookById(bookId) {
	try {
		const book = await db.collection("books").findOne({id: bookId});
		if (!book) throw new Error("This book doesn't exist!");

		return book;
	} catch (e) {
		throw e;
	}
}

export async function getBooksByGenre(genre) {
	try {
		const books = await db
			.collection("books")
			.find({"genre.genre": genre})
			.toArray();
		if (!books) throw new Error("This genre doesn't exist!");
		console.log(books);
		return books;
	} catch (e) {
		throw e;
	}
}

export async function updateBook(bookId, field, content) {
	try {
		if (field === "genre") {
			const genre = await db
				.collection("genres")
				.findOne({genre: {$eq: content}});
			if (!genre) throw new Error("Couldn't find genre");
			content = genre;
		}

		await db
			.collection("books")
			.updateOne({id: bookId}, {$set: {[field]: content}});

		const updatedBook = await db.collection("books").findOne({id: bookId});
		if (!updatedBook) throw new Error("Book not found");

		return updatedBook;
	} catch (e) {
		throw e;
	}
}
