"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_genre_controller_1 = require("../controllers/create-genre.controller");
const genreRouter = (0, express_1.Router)();
genreRouter.post("/create", create_genre_controller_1.createGenre);
exports.default = genreRouter;
