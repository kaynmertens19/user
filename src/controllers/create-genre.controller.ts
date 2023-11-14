import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GenreData {
  name: string;
}

const createGenreAndConnectToMovie = async (genreData: GenreData, movieId: string) => {
  try {
    // Create a new genre or find an existing genre with the same name
    const [existingGenre] = await prisma.genres.findMany({
      where: {
        name: genreData.name,
      },
    });

    const genre = existingGenre || (await prisma.genres.create({
      data: {
        name: genreData.name,
      },
    }));

    // Connect the genre to the specified movie
    await prisma.movies.update({
      where: {
        id: movieId,
      },
      data: {
        genres: {
          connect: {
            id: genre.id,
          },
        },
      },
    });

    return genre;
  } catch (error) {
    console.error("Error creating genre and connecting to movie:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default createGenreAndConnectToMovie;