import express from "express";
import {booksRouter} from "./booksRouter";
import {usersRouter} from "./usersRouter";
import {genresRouter} from "./genresRouter";
import {authMiddleware} from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.use("/books", booksRouter);
router.use("/users", usersRouter);
router.use("/genres", genresRouter);

export {router};
