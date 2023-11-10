import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";



export const userProfileController = async (req: Request , res: Response ) =>{
    const {id} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send("Usuario no autorizado")} 

   const {_id, name, surname, email} = existingUserId;

   return res.status(200).send({_id, name, surname, email})
}

export default userProfileController