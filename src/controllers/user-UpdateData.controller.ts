import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";



export const userUpdateDataController = async (req: Request , res: Response ) =>{
    const { id } = req.body;
    const {name, surname} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send("Usuario no autorizado")} 

    existingUserId.name = name;
    existingUserId.surname = surname;

    await existingUserId.save();

   return res.send("Usuario actualizado")
}

export default userUpdateDataController