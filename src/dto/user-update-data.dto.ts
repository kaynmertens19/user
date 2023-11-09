import {Type} from "@sinclair/typebox"
import Ajv from "ajv"
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { Request, Response } from "express";
import { idDTOSchema, nameDTOSchema, surnameDTOSchema, emailDTOSchema, passwordDTOSchema } from "../lib/dto-types";


const UpdateDataDTOSchema = Type.Object({
    name:nameDTOSchema,
    surname:surnameDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Format not valid"
    }
})

const ajv = new Ajv({allErrors: true});
addErrors(ajv).addKeyword("kind").addKeyword("modifier");

const validateSchema = ajv.compile(UpdateDataDTOSchema);

const updateDataDTO = (req: Request, res: Response, next: Function) =>{
   const isDTOValid = validateSchema(req.body);

   if(!isDTOValid){
    return res.status(400).send({errors: validateSchema.errors?.map((error) => error.message)})
   }
   next()
};

export default updateDataDTO;
