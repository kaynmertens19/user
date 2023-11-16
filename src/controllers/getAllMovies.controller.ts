
import { Request, Response } from "express";
import { prismaClient } from "../config/client";

async function getAllMovies(req: Request, res: Response) {
    try {
      const movies = await prismaClient.movies.findMany();
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'An error occurred while fetching movies.' });
    }
  }

  export default getAllMovies;