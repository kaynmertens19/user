"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const genreSchema = new Schema({
    genreName: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
});
const GenreModel = model("Genre", genreSchema);
exports.default = GenreModel;
