import { Request, Response } from "express-serve-static-core"
import GenreModel from "../schemas/genres.schema";

export const createGenre = async (req: Request, res: Response) => {
    const {genreName} = req.body;

    try{
        const genre = await GenreModel.create({genreName});

        res.status(201).json(genre);
    }catch(err){
        res.status(500).send("no ha funcionado")
    }
};
