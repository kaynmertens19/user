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
const moovie_schema_1 = __importDefault(require("../schemas/moovie.schema"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const genres_schema_1 = __importDefault(require("../schemas/genres.schema"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genreName } = req.body;
    const { userId } = req.params;
    try {
        // Check if the movie already exists
        const existingMovie = yield moovie_schema_1.default.findOne({ name, userId });
        if (existingMovie) {
            return res.status(400).json({ message: "Movie already exists" });
        }
        // Check if the genre already exists
        let genre = yield genres_schema_1.default.findOne({ name: genreName });
        // If the genre doesn't exist, create it
        if (!genre) {
            genre = yield genres_schema_1.default.create({ name: genreName });
        }
        // Create the movie and associate it with the genre
        const movie = yield moovie_schema_1.default.create({ name, userId, genre: genre._id });
        // Update the user's movies array
        yield user_schema_1.default.findByIdAndUpdate(userId, { $push: { movies: movie._id } });
        res.status(201).json(movie);
    }
    catch (err) {
        res.status(500).send("Something went wrong");
    }
});
exports.createMovie = createMovie;
