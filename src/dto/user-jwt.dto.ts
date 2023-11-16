import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const userJWTDTO = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send("Usuario no autorizado: Authorization header missing");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("Usuario no autorizado: Token missing");
  }

  try {
    const privateKey = process.env.JWT_PRIVATE_KEY as string;
    const decoded = jwt.verify(token, privateKey);

    if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
      req.id = decoded.id;
      next();
    } else {
      return res.status(401).send("Usuario no autorizado: Invalid token payload");
    }
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).send("Usuario no autorizado: Token verification failed");
  }
};

export default userJWTDTO;

