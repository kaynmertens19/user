import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {hash} from "bcrypt"



const userRegisterController = async (req: Request , res: Response ) =>{
    const {_id, name, surname, email, password} = req.body;

   const existingUserId = await UserModel.findById(_id).exec();
   if(existingUserId){return res.status(409).send("Ya existe ese usuario")} 

   const existingUserEmail = await UserModel.findById(email);
   if(existingUserEmail){return res.status(409).send("Ya existe ese usuario")} 

    const hashedPassword = await hash(password, 12)

  const user =  new UserModel({
    _id,
     name, 
     surname, 
     email,
     password:hashedPassword
   })

   await user.save();

   return res.status(201).send("Usuario has successfully registered")
}

export default userRegisterController