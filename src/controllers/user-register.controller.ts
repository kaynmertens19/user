import { Request, Response } from "express";
import { hash } from "bcrypt";
import { SALT } from "../constants/salt";
import { prismaClient } from "../config/client";

const userRegisterController = async (req: Request, res: Response) => {
  const { name, email, watchList } = req.body;

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).send({ errors: ["Usuario ya existente"] });
    }

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        movies: {
          create: [],
        },
        watchList: watchList || [], 
      },
      include: {
        movies: true,
      },
    });
    console.log('Backend Response:', {
      log: ["Usuario registrado con éxito"],
      uid: newUser._id, // Ensure newUser._id has a value
      user: newUser,
    });
    // Return the MongoDB ObjectId (uid) as the UID
    return res.status(201).send({
      log: ["Usuario registrado con éxito"],
      uid: newUser._id, // Use newUser._id as the UID
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