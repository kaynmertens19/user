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
exports.userUpdateEmailController = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const bcrypt_1 = require("bcrypt");
const userUpdateEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    const { email, password } = req.body;
    const existingUserId = yield user_schema_1.default.findById(id).exec();
    if (!existingUserId) {
        return res.status(401).send({ errors: ["usuario no eistente"] });
    }
    const userPassword = existingUserId.password;
    if (typeof userPassword !== "string") {
        return res.status(500).send({ errors: ["Invalid password"] });
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, userPassword);
    if (!passwordMatch) {
        return res.status(401).send({ errors: ["Credenciales incorrectas"] });
    }
    existingUserId.email = email;
    yield existingUserId.save();
    return res.send({ log: ["Email actualizado correctamente"] });
});
exports.userUpdateEmailController = userUpdateEmailController;
exports.default = exports.userUpdateEmailController;
