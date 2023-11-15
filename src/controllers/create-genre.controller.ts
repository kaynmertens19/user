import { prismaClient } from "../config/client";



interface GenreData {
  name: string;
}

const createGenreAndConnectToMovie = async (genreData: GenreData, movieId: string) => {
  try {

    const [existingGenre] = await prismaClient.genres.findMany({
      where: {
        name: genreData.name,
      },
    });

    const genre = existingGenre || (await prismaClient.genres.create({
      data: {
        name: genreData.name,
      },
    }));

  
    await prismaClient.movies.update({
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
    await prismaClient.$disconnect();
  }
};

export default createGenreAndConnectToMovie;