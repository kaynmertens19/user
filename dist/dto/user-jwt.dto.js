"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jose_1 = require("jose");
const userJWTDTO = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("Usuario no autorizado");
    }
    try {
        const encoder = new TextEncoder();
        const { payload } = yield (0, jose_1.jwtVerify)(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));
        // req.id = payload.id;
        next();
    }
    catch (err) {
        return res.status(401).send("Usuario no autorizado");
    }
    ;
});
exports.default = userJWTDTO;
