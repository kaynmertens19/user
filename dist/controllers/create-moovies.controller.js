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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = void 0;
const prs_1 = __importDefault(require("../config/prs"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genreName } = req.body;
    const userId = req.params.userId; // Ensure userId is correctly passed as a string
    try {
        // Check if the movie already exists
        const existingMovie = yield prs_1.default.movies.findFirst({
            where: {
                name,
                userId, // Make sure userId is of type String
            },
        });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exists' });
        }
        // Check if the genre exists
        let genre = yield prs_1.default.genres.findFirst({
            where: {
                name: genreName,
            },
        });
        // Create the genre if it doesn't exist
        if (!genre) {
            genre = yield prs_1.default.genres.create({
                data: {
                    name: genreName,
                },
            });
        }
        // Create a new movie based on the genre
        const movie = yield prs_1.default.movies.create({
            data: {
                name,
                userId,
                genreId: genre.id,
            },
        });
        // Update the user's movies array
        yield prs_1.default.user.update({
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
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.createMovie = createMovie;
