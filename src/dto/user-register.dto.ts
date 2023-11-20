import {Type} from "@sinclair/typebox"
import Ajv from "ajv"
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { Request, Response } from "express";
import { idDTOSchema, nameDTOSchema, surnameDTOSchema, emailDTOSchema, passwordDTOSchema } from "../lib/dto-types";


const RegisterDTOSchema = Type.Object({
    name:nameDTOSchema,
    email:emailDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Format not valid"
    }
})

const ajv = new Ajv({allErrors: true});

addFormats(ajv, ["email"] ).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req: Request, res: Response, next: Function) =>{
   const isDTOValid = validateSchema(req.body);

   if(!isDTOValid){
    return res.status(400).send({errors: validateSchema.errors?.map((error) => error.message)})
   }
   next()
};

export default userRegisterDTO;
