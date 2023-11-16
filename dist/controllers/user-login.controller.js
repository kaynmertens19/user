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
exports.userLoginController = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("../config/client");
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email in your database
        const existingUser = yield client_1.prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
        }
        const userPassword = existingUser.password;
        if (typeof userPassword !== "string") {
            return res.status(500).send({ errors: ["Credenciales Incorrectas"] });
        }
        // Compare the provided password with the hashed password using bcrypt
        const passwordMatch = yield (0, bcrypt_1.compare)(password, userPassword);
        if (!passwordMatch) {
            return res.status(401).send({ errors: ["Credenciales Incorrectas"] });
        }
        // If the password is correct, create a JWT token
        const jwtPayload = {
            id: existingUser.id,
        };
        const jwtToken = (0, jsonwebtoken_1.sign)(jwtPayload, process.env.JWT_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: '7d', // Token expiration time (adjust as needed)
        });
        return res.status(202).send({ logs: ["Usuario logeado con éxito"], token: jwtToken });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ errors: ["Algo salió mal"] });
    }
});
exports.userLoginController = userLoginController;
