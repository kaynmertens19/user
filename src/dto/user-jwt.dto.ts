import { Request, Response } from "express";
import { jwtVerify } from "jose";

const userJWTDTO = async (req: Request, res: Response, next: Function) => {
    const {authorization} = req.headers;

        if(!authorization){
            return res.status(401).send("Usuario no autorizado")
        }

        try{
           const encoder = new TextEncoder();
            const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY) )

            // req.id = payload.id;

            next()
        } catch(err){
            return res.status(401).send("Usuario no autorizado")
        };

}

export default userJWTDTO