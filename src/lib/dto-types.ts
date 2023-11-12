import {Type} from "@sinclair/typebox"


export const idDTOSchema = Type.String({
    format: "uuid",
    errorMessage: {
        type: "El tipo de _id no es valido, debe ser un string",
        format: "El formato de _id no es valido, debe ser un uuid4"
    }
});

export const nameDTOSchema = Type.String({
    minLength: 2 ,
    maxLength: 20 ,
    errorMessage: {
        minLength: "name debe tener al menos 2 caracteres de longitud",
        maxLength: "name debe tener como maximo 20 caracteres de longitud",
    }
})

export const surnameDTOSchema = Type.String({
    minLength: 4 ,
    maxLength: 50 ,
    errorMessage: {
        minLength: "surname debe tener al menos 4 caracteres de longitud",
        maxLength: "surname debe tener como maximo 50 caracteres de longitud",
    }
})

export const emailDTOSchema = Type.String({
    format: "email",
    errorMessage: {
        type: "El tipo del email no es valido, debe ser un string",
        format: "El formato de email no es valido"
    }
})

export const passwordDTOSchema = Type.String({
    format: "passwordo",
    minLength: 10 ,
    maxLength: 25 ,
    errorMessage: {
        type: "El tipo de la contraseña no es valido, debe ser un string",
        format: "El formato de la contraseña no es valido, debe contener una mayuscula, una minuscula y un numero como mínimo",
        minLength: "password debe tener al menos 10 caracteres de longitud",
        maxLength: "password debe tener como maximo 25 caracteres de longitud",
    }
})