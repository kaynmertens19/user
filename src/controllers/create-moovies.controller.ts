import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createMovie = async (req: Request, res: Response) => {
  const { name, genreName, description, score, poster_img } = req.body;
  const userId = req.params.userId; // Ensure userId is correctly passed as a string

  try {
    if (!description || !score || !poster_img) {
      return res.status(400).json({ message: 'Description, score, and poster_img are required' });
    }

    const existingMovie = await prisma.movies.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existingMovie) {
      return res.status(400).json({ message: 'Movie already exists' });
    }

    let genre = await prisma.genres.findFirst({
      where: {
        name: genreName,
      },
    });

    if (!genre) {
      genre = await prisma.genres.create({
        data: {
          name: genreName,
        },
      });
    }

    const movie = await prisma.movies.create({
      data: {
        name,
        userId,
        genres: {
          connect: { id: genre.id }, // Connect the movie to the genre
        },
        description,
        score,
        poster_img,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        watchList: {
          push: movie.id,
        },
      },
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};