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
exports.createGenre = void 0;
const genres_schema_1 = __importDefault(require("../schemas/genres.schema"));
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreName } = req.body;
    try {
        const genre = yield genres_schema_1.default.create({ genreName });
        res.status(201).json(genre);
    }
    catch (err) {
        res.status(500).send("no ha funcionado");
    }
});
exports.createGenre = createGenre;
