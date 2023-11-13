import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";


export const userProfileController = async (req: Request , res: Response ) =>{
    const {id} = req;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send({errors:["usuario no autorizado"]});} 

   const {_id, name, surname, email, movies} = existingUserId;

   return res.status(200).send({_id, name, surname, email, movies})
}

export default userProfileController;