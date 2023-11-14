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
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const salt_1 = require("../constants/salt");
const prisma = new client_1.PrismaClient();
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, email, password, watchList } = req.body;
    try {
        // Check if a user with the same email already exists
        const existingUser = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(409).send({ errors: ["Usuario ya existente"] });
        }
        // Hash the password
        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt_1.SALT);
        // Create a new user using Prisma with an empty "movies" array and watchList
        const newUser = yield prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: hashedPassword,
                movies: {
                    create: [],
                },
                watchList: watchList || [], // Ensure watchList is an array
            },
            include: {
                movies: true,
            },
        });
        return res.status(201).send({
            log: ["Usuario registrado con éxito"],
            user: newUser,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ errors: ["Error interno del servidor"] });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.default = userRegisterController;
