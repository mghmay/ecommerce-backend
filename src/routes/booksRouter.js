import express from "express";
import {
	handleGetBookById,
	handleGetAllBooks,
	handleGetBooksByGenre,
	handleUpdateBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/", handleGetAllBooks);
router.get("/:bookId", handleGetBookById);
router.get("/genre/:genre", handleGetBooksByGenre);
router.patch("/:bookId", handleUpdateBook);

export {router as booksRouter};
