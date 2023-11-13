import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign, Secret } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
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

    // Compare the password using bcrypt
    const passwordMatch = await compare(password, userPassword);

    if (!passwordMatch) {
      return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
    }

    // Generate a JSON Web Token (JWT)
    const jwtPayload = {
      id: existingUser.id,
    };

    const jwt = sign(jwtPayload, process.env.JWT_PRIVATE_KEY as Secret, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    return res.status(202).send({ logs: ["Usuario logeado con exito"], token: jwt });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errors: ["Something went wrong"] });
  }
};

export default userLoginController;