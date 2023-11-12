import {Type} from "@sinclair/typebox"
import Ajv from "ajv"
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { Request, Response } from "express";
import { idDTOSchema, nameDTOSchema, surnameDTOSchema, emailDTOSchema, passwordDTOSchema } from "../lib/dto-types";


const UpdateEmailDTOSchema = Type.Object({
    email:emailDTOSchema,
    password:passwordDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Format not valid"
    }
})

const ajv = new Ajv({allErrors: true});
ajv.addFormat("passwordo", /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)

addFormats(ajv, ["email"] ).addKeyword("kind").addKeyword("modifier");
addErrors(ajv)

const validateSchema = ajv.compile(UpdateEmailDTOSchema);

const updateEmailDTO = (req: Request, res: Response, next: Function) =>{
   const isDTOValid = validateSchema(req.body);

   if(!isDTOValid){
    return res.status(400).send({errors: validateSchema.errors?.map((error) => error.message)})
   }
   next()
};

export default updateEmailDTO;
