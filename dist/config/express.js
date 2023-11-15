"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const moovie_routes_1 = __importDefault(require("../routes/moovie.routes"));
const cors = require("cors");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(cors());
// Rourtes
app.use("/user", user_routes_1.default);
app.use("/movie", moovie_routes_1.default);
exports.default = app;
