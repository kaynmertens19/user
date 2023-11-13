import { Router } from "express";
import { createGenre } from "../controllers/create-genre.controller";

const genreRouter = Router();

genreRouter.post("/create", createGenre)

export default genreRouter;
