"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const auth0_1 = __importDefault(require("../config/auth0"));
if (!auth0_1.default || !auth0_1.default.auth0 || !auth0_1.default.auth0.audience || !auth0_1.default.auth0.issuer) {
    console.error("Auth0 Configuration:", auth0_1.default);
    throw new Error("Missing or incomplete Auth0 configuration.");
}
const authOptions = {
    audience: auth0_1.default.auth0.audience,
    issuerBaseURL: auth0_1.default.auth0.issuer,
};
const checkJwtDTO = (0, express_oauth2_jwt_bearer_1.auth)(authOptions);
exports.default = checkJwtDTO;
