"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const movieSchema = new Schema({
    name: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
    genre: [
        {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            require: true
        }
    ]
});
const movieModel = model("Movie", movieSchema);
exports.default = movieModel;
