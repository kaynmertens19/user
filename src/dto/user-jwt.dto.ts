import { Request, Response } from "express";
import { jwtVerify } from "jose";

// Define a custom type for the Request object
interface CustomRequest extends Request {
  id?: string; // Add the 'id' property to the Request object
}

const userJWTDTO = async (req: CustomRequest, res: Response, next: Function) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Usuario no autorizado");
  }

  const jwt = authorization.split(" ")[1];
  if (!jwt) {
    return res.status(401).send("Usuario no autorizado");
  }

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization.split(" ")[1],
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    // Check if payload.id exists and is a string before assigning it to req.id
    if (typeof payload.id === "string") {
      req.id = payload.id;
    }

    next();
  } catch (err) {
    return res.status(401).send("Usuario no autorizado");
  }
};

export default userJWTDTO;