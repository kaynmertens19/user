import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";



export const userUnregisterController = async (req: Request , res: Response ) =>{
    const { id } = req.body;
    const {password} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send({errors:["Usuario no autorizado"]})} 

   const userPassword = existingUserId.password;

   if (typeof userPassword !== "string") {

     return res.status(500).send({errors:["Invalid password"]});
   }

   const passwordMatch = await compare(password, userPassword);
   if(!passwordMatch) {
    return res.status(401).send({errors:["Credenciales incorrectas"]});
   }

   await existingUserId.delete()

   return res.send({log:["Usuario eliminado correctamente"]})
}

export default userUnregisterController