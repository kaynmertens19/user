import { Request, Response } from "express";
import { hash } from "bcrypt";
import { SALT } from "../constants/salt";
import { prismaClient } from "../config/client";

const userRegisterController = async (req: Request, res: Response) => {
  const { name, surname, email, password, watchList } = req.body;

  try {
  
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).send({ errors: ["Usuario ya existente"] });
    }


    const hashedPassword = await hash(password, SALT);


    const newUser = await prismaClient.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        movies: {
          create: [],
        },
        watchList: watchList || [], 
      },
      include: {
        movies: true,
      },
    });

    return res.status(201).send({
      log: ["Usuario registrado con éxito"],
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send({ errors: ["Error interno del servidor"] });
  } finally {
    await prismaClient.$disconnect();
  }
};

export default userRegisterController;