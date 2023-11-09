"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_js_1 = __importDefault(require("./express.js"));
const httpServer = (0, http_1.createServer)(express_js_1.default);
exports.default = httpServer;
