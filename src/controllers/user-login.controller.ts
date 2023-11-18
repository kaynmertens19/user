import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign, Secret } from "jsonwebtoken";
import { prismaClient } from "../config/client";

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
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


    const passwordMatch = await compare(password, userPassword);

    if (!passwordMatch) {
      return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
    }

    const jwtPayload = {
      id: existingUser.id,
    };

    const jwtToken = sign(jwtPayload, process.env.JWT_PRIVATE_KEY as Secret, {
      algorithm: 'HS256',
      expiresIn: '7d', 
    });

    res.setHeader('authorization', `${jwtToken}`);
    
    return res.status(202).send({ logs: ["Usuario logeado con éxito"] });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errors: ["Algo salió mal"] });
  }
};