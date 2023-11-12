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
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const user_schema_2 = __importDefault(require("../schemas/user.schema"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { userId } = req.params;
    try {
        const movie = yield user_schema_1.default.create({ name, userId });
        const user = yield user_schema_2.default.findByIdAndUpdate({ _id: userId }, { $push: { movies: movie._id } });
        res.status(201).send("Ha sido creada correctamente");
    }
    catch (err) {
        res.status(500).send("No ha podido crearse");
    }
});
exports.createMovie = createMovie;
