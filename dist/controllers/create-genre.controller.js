"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../config/client");
const createGenreAndConnectToMovie = (genreData, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [existingGenre] = yield client_1.prismaClient.genres.findMany({
            where: {
                name: genreData.name,
            },
        });
        const genre = existingGenre || (yield client_1.prismaClient.genres.create({
            data: {
                name: genreData.name,
            },
        }));
        yield client_1.prismaClient.movies.update({
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
    }
    catch (error) {
        console.error("Error creating genre and connecting to movie:", error);
        throw error;
    }
    finally {
        yield client_1.prismaClient.$disconnect();
    }
});
exports.default = createGenreAndConnectToMovie;
