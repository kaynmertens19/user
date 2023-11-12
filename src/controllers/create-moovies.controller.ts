import { Request, Response } from "express-serve-static-core"
import movieModel from "../schemas/user.schema";
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";

export const createMovie = async (req: Request, res: Response) => {
    const {name, description} = req.body;
    const {userId} = req.params

    try{
        const movie = await movieModel.create({name, userId});

        const user = await UserModel.findByIdAndUpdate(
            {_id: userId}, 
            {$push: {movies: movie._id}}
            );

        res.status(201).send("Ha sido creada correctamente");
    }catch(err){
        res.status(500).send("No ha podido crearse")
    }
};
