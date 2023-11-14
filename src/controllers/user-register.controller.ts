import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { SALT } from "../constants/salt";

const prisma = new PrismaClient();

const userRegisterController = async (req: Request, res: Response) => {
  const { name, surname, email, password, watchList } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).send({ errors: ["Usuario ya existente"] });
    }

    // Hash the password
    const hashedPassword = await hash(password, SALT);

    // Create a new user using Prisma with an empty "movies" array and watchList
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        movies: {
          create: [],
        },
        watchList: watchList || [], // Ensure watchList is an array
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
    await prisma.$disconnect();
  }
};

export default userRegisterController;