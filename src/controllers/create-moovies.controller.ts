import { Request, Response } from "express-serve-static-core"
import movieModel from "../schemas/moovie.schema";
import UserModel from "../schemas/user.schema";
import GenreModel from "../schemas/genres.schema";
import { createGenre } from "./create-genre.controller";

export const createMovie = async (req: Request, res: Response) => {
    const {name, genreName} = req.body;
    const {userId} = req.params;

    const existingGenre= await GenreModel.findOne({genreName});
    if(!existingGenre){
        createGenre(req, res)
    }

    try{
        const movie = await movieModel.create({name, userId, genreName});

        await UserModel.findByIdAndUpdate({_id: userId}, {$push: {movies: movie._id}});

        res.status(201).json(movie);
    }catch(err){
        res.status(500).send("no ha funcionado")
    }
};
