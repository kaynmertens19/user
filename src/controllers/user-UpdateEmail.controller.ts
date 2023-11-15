import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";




export const userUpdateEmailController = async (req: Request , res: Response ) =>{
    const { id } = req;
    const {email, password} = req.body;

    const existingUserId = await UserModel.findById(id).exec();
   if(!existingUserId){return res.status(401).send({errors:["usuario no eistente"]})} 

   const userPassword = existingUserId.password;

   if (typeof userPassword !== "string") {

     return res.status(500).send({errors:["Invalid password"]});
   }

   const passwordMatch = await compare(password, userPassword);

   if(!passwordMatch) {
    return res.status(401).send({errors:["Credenciales incorrectas"]});
   }

   existingUserId.email = email;

    await existingUserId.save();

   return res.send({log:["Email actualizado correctamente"]})
}

export default userUpdateEmailController