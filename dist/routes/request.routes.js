"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouterPrivate = exports.requestRouterPublic = void 0;
const express_1 = require("express");
const request_controller_1 = require("../controllers/request.controller");
const check_jwt_dto_1 = __importDefault(require("../dto/check-jwt.dto"));
const user_routes_1 = __importDefault(require("./user.routes"));
exports.requestRouterPublic = (0, express_1.Router)();
exports.requestRouterPrivate = (0, express_1.Router)();
exports.requestRouterPublic.get("/public", request_controller_1.publicRequest, user_routes_1.default);
exports.requestRouterPrivate.get("/protected", check_jwt_dto_1.default, request_controller_1.privateRequest);
