import express from "express";
import {
	handleAddToCart,
	handleRemoveFromCart,
	handleGetCart,
} from "../controllers/usersController";

const router = express.Router();

router.get("/:userId/cart", handleGetCart);
router.post("/:userId/cart", handleAddToCart);
router.delete("/:userId/cart/:productId", handleRemoveFromCart);

export {router as usersRouter};
