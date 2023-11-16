"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_moovies_controller_1 = require("../controllers/create-moovies.controller");
const getAllMovies_controller_1 = __importDefault(require("../controllers/getAllMovies.controller"));
const movieRouter = (0, express_1.Router)();
movieRouter.post("/:userId", create_moovies_controller_1.createMovie);
movieRouter.get("/getall", getAllMovies_controller_1.default);
exports.default = movieRouter;
