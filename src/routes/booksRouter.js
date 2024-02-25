import express from "express";
import {
	handleGetBookById,
	handleGetAllBooks,
	handleGetAllBooksByGenre,
	handleUpdateBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/", handleGetAllBooks);
router.get("/:bookId", handleGetBookById);
router.get("/genre/:genre", handleGetAllBooksByGenre);
router.patch("/:bookId", handleUpdateBook);

export {router as booksRouter};
