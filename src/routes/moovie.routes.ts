import { Router } from "express";
import { createMovie } from "../controllers/create-moovies.controller";
import getAllMovies from "../controllers/getAllMovies.controller";

const movieRouter = Router();

movieRouter.post("/:userId", createMovie)
movieRouter.get("/getall", getAllMovies)

export default movieRouter;
