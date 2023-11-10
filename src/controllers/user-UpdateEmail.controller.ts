import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";



export const userUpdateEmailController = async (req: Request , res: Response ) =>{
    const { id } = req.body;
    const {email, password} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send("Usuario no autorizado")} 

   const userPassword = existingUserId.password;

   if (typeof userPassword !== "string") {
     // Handle the case where the password is not a valid string.
     return res.status(500).send("Invalid password");
   }

   const passwordMatch = await compare(password, userPassword);

   if(!passwordMatch) {
    return res.status(401).send("Credenciales incorrectas");
   }

   existingUserId.email = email;

    await existingUserId.save();

   return res.send(" Email del usuario actualizado")
}

export default userUpdateEmailController