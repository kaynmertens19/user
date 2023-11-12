import { Router } from "express";
import { createMovie } from "../controllers/create-moovies.controller";

const movieRouter = Router();

movieRouter.post("/:userId", createMovie)

export default movieRouter;
