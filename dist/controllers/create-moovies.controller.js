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
exports.createMovie = void 0;
const client_1 = require("../config/client");
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genreName, description, score, poster_img } = req.body;
    const userId = req.params.userId; // Ensure userId is correctly passed as a string
    try {
        if (!description || !score || !poster_img) {
            return res.status(400).json({ message: 'Description, score, and poster_img are required' });
        }
        const existingMovie = yield client_1.prismaClient.movies.findFirst({
            where: {
                name,
                userId,
            },
        });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exists' });
        }
        let genre = yield client_1.prismaClient.genres.findFirst({
            where: {
                name: genreName,
            },
        });
        if (!genre) {
            genre = yield client_1.prismaClient.genres.create({
                data: {
                    name: genreName,
                },
            });
        }
        const movie = yield client_1.prismaClient.movies.create({
            data: {
                name,
                userId,
                genres: {
                    connect: { id: genre.id },
                },
                description,
                score,
                poster_img,
            },
        });
        yield client_1.prismaClient.user.update({
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
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
    finally {
        yield client_1.prismaClient.$disconnect();
    }
});
exports.createMovie = createMovie;
