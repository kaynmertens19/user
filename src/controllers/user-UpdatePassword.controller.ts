import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare, hash} from "bcrypt"
import { SignJWT } from "jose";
import { SALT } from "../constants/salt";


declare module 'express-serve-static-core' {
  interface Request {
    id: string; 
  }
}

export const userUpdatePasswordController = async (req: Request , res: Response ) =>{
    const { id } = req;
    const {oldPassword, newPassword} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send({errors:["usuario no existe"]});} 

   const userPassword = existingUserId.password;

   if (typeof userPassword !== "string") {

     return res.status(500).send({errors:["Invalid password"]});
   }

   const passwordMatch = await compare(oldPassword, userPassword);

   if(!passwordMatch) {
    return res.status(401).send({errors:["Credenciales incorrectas"]});
   }
   const hashedPassword = await hash(newPassword, SALT)

   existingUserId.password = hashedPassword;

   console.log(typeof(hashedPassword))
    await existingUserId.save();

   return res.send({log:["Contraseña actualizada correctamente"]})
}

export default userUpdatePasswordController