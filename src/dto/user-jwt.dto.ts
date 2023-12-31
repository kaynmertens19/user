import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const userJWTDTO = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send("Usuario no autorizado");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("Usuario no autorizado");
  }

  try {
    // Verify the JWT token using your secret or private key
    const privateKey = process.env.JWT_PRIVATE_KEY as string;
    const decoded = jwt.verify(token, privateKey);

    // Assign the user ID from the decoded JWT payload to req.id
    if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
      req.id = decoded.id;
    } else {
      return res.status(401).send("Usuario no autorizado");
    }

    next();
  } catch (err) {
    return res.status(401).send("Usuario no autorizado");
  }
};

export default userJWTDTO;