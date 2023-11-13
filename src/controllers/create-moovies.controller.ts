import prisma from '../config/prs';
import { Request, Response } from 'express';


export const createMovie = async (req: Request, res: Response) => {
    const { name, genreName } = req.body;
    const userId = req.params.userId; // Ensure userId is correctly passed as a string
  
    try {
      // Check if the movie already exists
      const existingMovie = await prisma.movies.findFirst({
        where: {
          name,
          userId, // Make sure userId is of type String
        },
      });
  
      if (existingMovie) {
        return res.status(400).json({ message: 'Movie already exists' });
      }
  
      // Check if the genre exists
      let genre = await prisma.genres.findFirst({
        where: {
          name: genreName,
        },
      });
  
      // Create the genre if it doesn't exist
      if (!genre) {
        genre = await prisma.genres.create({
          data: {
            name: genreName,
          },
        });
      }
  
      // Create a new movie based on the genre
      const movie = await prisma.movies.create({
        data: {
          name,
          userId, // Ensure userId is of type String
          genreId: genre.id,
        },
      });
  
      // Update the user's movies array
      await prisma.user.update({
        where: {
          id: userId, // Ensure userId is of type String
        },
        data: {
          movies: {
            connect: {
              id: movie.id,
            },
          },
        },
      });
  
      res.status(201).json(movie);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };