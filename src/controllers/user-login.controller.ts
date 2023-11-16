import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign, Secret } from "jsonwebtoken";
import { prismaClient } from "../config/client";

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in your database
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
    }

    const userPassword = existingUser.password;

    if (typeof userPassword !== "string") {
      return res.status(500).send({ errors: ["Credenciales Incorrectas"] });
    }

    // Compare the provided password with the hashed password using bcrypt
    const passwordMatch = await compare(password, userPassword);

    if (!passwordMatch) {
      return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
    }

    // If the password is correct, create a JWT token
    const jwtPayload = {
      id: existingUser.id,
    };

    const jwtToken = sign(jwtPayload, process.env.JWT_PRIVATE_KEY as Secret, {
      algorithm: 'HS256',
      expiresIn: '7d', // Token expiration time (adjust as needed)
    });

    return res.status(202).send({ logs: ["Usuario logeado con éxito"], token: jwtToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errors: ["Algo salió mal"] });
  }
};