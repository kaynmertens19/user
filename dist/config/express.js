"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_routes_1 = require("../routes/request.routes");
const cors = require("cors");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(cors());
// Rourtes
app.use("/api", request_routes_1.requestRouterPublic);
app.use("/api", request_routes_1.requestRouterPrivate);
exports.default = app;
