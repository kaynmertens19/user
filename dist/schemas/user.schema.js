"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    _id: {
        type: "string", _id: false
    },
    name: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
    surname: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: "string",
        require: true,
        unique: true
    },
    password: {
        type: "string",
        require: true
    }
});
const UserModel = model("User", userSchema);
exports.default = UserModel;
