import { Request, Response } from "express-serve-static-core"
import UserModel from "../schemas/user.schema";
import {hash} from "bcrypt"
import { SALT } from "../constants/salt";



const userRegisterController = async (req: Request , res: Response ) =>{
    const {_id, name, surname, email, password} = req.body;

   const existingUserId = await UserModel.findById(_id).exec();
   if(existingUserId){return res.status(409).send({errors:["usuario ya existente"]})} 

   const existingUserEmail = await UserModel.findById(email);
   if(existingUserEmail){return res.status(409).send({errors:["usuario ya existente"]})} 

    const hashedPassword = await hash(password, SALT)

  const user =  new UserModel({
    _id,
     name, 
     surname, 
     email,
     password:hashedPassword
   })

   await user.save();

   return res.status(201).send({log:["Usuario registrado con exito"]})
}

export default userRegisterController