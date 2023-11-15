"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userJWTDTO = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send("Usuario no autorizado");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send("Usuario no autorizado");
    }
    try {
        const privateKey = process.env.JWT_PRIVATE_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
            req.id = decoded.id;
        }
        else {
            return res.status(401).send("Usuario no autorizado");
        }
        next();
    }
    catch (err) {
        return res.status(401).send("Usuario no autorizado");
    }
};
exports.default = userJWTDTO;
