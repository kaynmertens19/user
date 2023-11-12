import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";

declare module 'express-serve-static-core' {
    interface Request {
      id: string; 
    }
  }

export const userUpdateDataController = async (req: Request , res: Response ) =>{
    const { id } = req;
    const {name, surname} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send({errors:["usuario no existente"]})} 

    existingUserId.name = name;
    existingUserId.surname = surname;

    await existingUserId.save();

   return res.send({log:["usuario actualizado"]})
}

export default userUpdateDataController