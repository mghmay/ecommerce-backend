import express from "express";
import {handleGetAllGenres} from "../controllers/genresController";

const router = express.Router();

router.get("/", handleGetAllGenres);

export {router as genresRouter};
