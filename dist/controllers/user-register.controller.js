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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const bcrypt_1 = require("bcrypt");
const salt_1 = require("../constants/salt");
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, surname, email, password } = req.body;
    const existingUserId = yield user_schema_1.default.findById(_id).exec();
    if (existingUserId) {
        return res.status(409).send({ errors: ["usuario ya existente"] });
    }
    const existingUserEmail = yield user_schema_1.default.findById(email);
    if (existingUserEmail) {
        return res.status(409).send({ errors: ["usuario ya existente"] });
    }
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt_1.SALT);
    const user = new user_schema_1.default({
        _id,
        name,
        surname,
        email,
        password: hashedPassword
    });
    yield user.save();
    return res.status(201).send({ log: ["Usuario registrado con exito"] });
});
exports.default = userRegisterController;
