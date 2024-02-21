import express from "express";
import {
	handleGetProductById,
	handleGetAllProducts,
} from "../controllers/productsController";

const router = express.Router();

router.get("/:productId", handleGetProductById);
router.get("/", handleGetAllProducts);

export {router as productsRouter};
