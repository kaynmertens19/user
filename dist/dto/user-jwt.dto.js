"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userJWTDTO = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send("Usuario no autorizado: Authorization header missing");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send("Usuario no autorizado: Token missing");
    }
    try {
        const privateKey = process.env.JWT_PRIVATE_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
            req.id = decoded.id;
            next();
        }
        else {
            return res.status(401).send("Usuario no autorizado: Invalid token payload");
        }
    }
    catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).send("Usuario no autorizado: Token verification failed");
    }
};
exports.default = userJWTDTO;
