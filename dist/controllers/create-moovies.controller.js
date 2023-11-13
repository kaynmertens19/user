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
const create_genre_controller_1 = require("./create-genre.controller");
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genreName } = req.body;
    const { userId } = req.params;
    const existingGenre = yield genres_schema_1.default.findOne({ genreName });
    if (!existingGenre) {
        (0, create_genre_controller_1.createGenre)(req, res);
    }
    try {
        const movie = yield moovie_schema_1.default.create({ name, userId, genreName });
        yield user_schema_1.default.findByIdAndUpdate({ _id: userId }, { $push: { movies: movie._id } });
        res.status(201).json(movie);
    }
    catch (err) {
        res.status(500).send("no ha funcionado");
    }
});
exports.createMovie = createMovie;
