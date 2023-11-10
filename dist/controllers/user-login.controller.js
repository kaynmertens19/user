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
exports.userLoginController = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const bcrypt_1 = require("bcrypt");
const jose_1 = require("jose");
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUserEmail = yield user_schema_1.default.findOne({ email }).exec();
    if (!existingUserEmail) {
        return res.status(401).send("Credenciales Incorrectas");
    }
    const userPassword = existingUserEmail.password;
    if (typeof userPassword !== "string") {
        // Handle the case where the password is not a valid string.
        return res.status(500).send("Invalid password");
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, userPassword);
    if (!passwordMatch) {
        return res.status(401).send("Credenciales incorrectas");
    }
    const jwtConstructor = new jose_1.SignJWT({ id: existingUserEmail._id });
    const encoder = new TextEncoder();
    const jwt = yield jwtConstructor.setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
    }).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    return res.status(202).send("Usuario logeado con exito");
});
exports.userLoginController = userLoginController;
exports.default = exports.userLoginController;
