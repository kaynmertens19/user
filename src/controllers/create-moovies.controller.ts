import { Request, Response } from "express";
import movieModel from "../schemas/moovie.schema";
import UserModel from "../schemas/user.schema";
import GenreModel from "../schemas/genres.schema";

export const createMovie = async (req: Request, res: Response) => {
  const { name, genreName } = req.body;
  const { userId } = req.params;

  try {
    // Check if the movie already exists
    const existingMovie = await movieModel.findOne({ name, userId });

    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    // Check if the genre already exists
    let genre = await GenreModel.findOne({ name: genreName });

    // If the genre doesn't exist, create it
    if (!genre) {
      genre = await GenreModel.create({ name: genreName });
    }

    // Create the movie and associate it with the genre
    const movie = await movieModel.create({ name, userId, genre: genre._id });

    // Update the user's movies array
    await UserModel.findByIdAndUpdate(userId, { $push: { movies: movie._id } });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};