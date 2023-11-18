"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRequest = exports.publicRequest = void 0;
const publicRequest = (req, res) => {
    res.send({ message: "Public request" });
};
exports.publicRequest = publicRequest;
const privateRequest = (req, res) => {
    res.send({ message: "private request" });
};
exports.privateRequest = privateRequest;
