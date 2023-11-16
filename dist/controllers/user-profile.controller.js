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
exports.userProfileController = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const userProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    try {
        // Find the user by ID in your database
        const existingUser = yield user_schema_1.default.findById(id).exec();
        if (!existingUser) {
            return res.status(401).send({ errors: ["Usuario no autorizado"] });
        }
        // Destructure user properties you want to include in the response
        const { name, surname, email, movies } = existingUser;
        return res.status(200).send({ name, surname, email, movies });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ errors: ["Algo salió mal"] });
    }
});
exports.userProfileController = userProfileController;
exports.default = exports.userProfileController;
