"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_moovies_controller_1 = require("../controllers/create-moovies.controller");
const movieRouter = (0, express_1.Router)();
movieRouter.post("/:userId", create_moovies_controller_1.createMovie);
exports.default = movieRouter;
