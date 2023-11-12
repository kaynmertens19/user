import {Type} from "@sinclair/typebox"
import Ajv from "ajv"
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { Request, Response } from "express";
import { idDTOSchema, nameDTOSchema, surnameDTOSchema, emailDTOSchema, passwordDTOSchema } from "../lib/dto-types";


const UpdatePasswordDTOSchema = Type.Object({
    oldPassword:passwordDTOSchema,
    newPassword:passwordDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Format not valid"
    }
})

const ajv = new Ajv({allErrors: true});
ajv.addFormat("passwordo", /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)


addErrors(ajv).addKeyword("kind").addKeyword("modifier");

const validateSchema = ajv.compile(UpdatePasswordDTOSchema);

const updatePasswordDTO = (req: Request, res: Response, next: Function) =>{
   const isDTOValid = validateSchema(req.body);

   if(!isDTOValid){
    return res.status(400).send({errors: validateSchema.errors?.map((error) => error.message)})
   }
   next()
};

export default updatePasswordDTO;
