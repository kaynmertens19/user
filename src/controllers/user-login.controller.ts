import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {compare} from "bcrypt"
import { SignJWT } from "jose";



export const userLoginController = async (req: Request , res: Response ) =>{
    const {email, password} = req.body;

    const existingUserEmail = await UserModel.findOne({ email }).exec();
   if(!existingUserEmail){return res.status(401).send({errors:["Credenciales Incorrectas"]});} 

   const userPassword = existingUserEmail.password;

   if (typeof userPassword !== "string") {
     // Handle the case where the password is not a valid string.
     return res.status(500).send({errors:["Credenciales Incorrectas"]});
   }

   const passwordMatch = await compare(password, userPassword);

   if(!passwordMatch) {
    return res.status(401).send({errors:["Credenciales Incorrectas"]});
   }

   const jwtConstructor = new SignJWT({id: existingUserEmail._id});

   const encoder = new TextEncoder();

   const jwt = await jwtConstructor.setProtectedHeader({
    alg: 'HS256',
    typ: 'JWT'
   }).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

   return res.status(202).send({logs:["Usuario logeado con exito"]})

}

export default userLoginController