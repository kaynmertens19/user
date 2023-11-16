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
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movies = yield client_1.prismaClient.movies.findMany();
            res.json(movies);
        }
        catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ error: 'An error occurred while fetching movies.' });
        }
    });
}
exports.default = getAllMovies;
