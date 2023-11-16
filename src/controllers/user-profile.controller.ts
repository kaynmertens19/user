import { Request, Response } from "express";
import UserModel from "../schemas/user.schema";

export const userProfileController = async (req: Request, res: Response) => {
  const { id } = req;

  try {
    // Find the user by ID in your database
    const existingUser = await UserModel.findById(id).exec();

    if (!existingUser) {
      return res.status(401).send({ errors: ["Usuario no autorizado"] });
    }

    // Destructure user properties you want to include in the response
    const { name, surname, email, movies } = existingUser;

    return res.status(200).send({ name, surname, email, movies });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errors: ["Algo salió mal"] });
  }
};

export default userProfileController;