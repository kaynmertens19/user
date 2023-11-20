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
const client_1 = require("../config/client");
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, watchList } = req.body;
    try {
        const existingUser = yield client_1.prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(409).send({ errors: ["Usuario ya existente"] });
        }
        const newUser = yield client_1.prismaClient.user.create({
            data: {
                name,
                email,
                movies: {
                    create: [],
                },
                watchList: watchList || [],
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
        yield client_1.prismaClient.$disconnect();
    }
});
exports.default = userRegisterController;
