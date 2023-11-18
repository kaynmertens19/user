"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = process.env.NODE_ENV || "development";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173/";
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || "http://localhost:3004/";
const AUTH0_ISSUER = process.env.AUTH0_ISSUER || "https://dev-ka6yzlm76anfsll8.us.auth0.com/";
const CONFIG = {
    development: {
        auth0: {
            client_origin: CLIENT_ORIGIN,
            audience: AUTH0_AUDIENCE,
            issuer: AUTH0_ISSUER,
        },
    },
    production: {
        auth0: {
            client_origin: CLIENT_ORIGIN,
            audience: AUTH0_AUDIENCE,
            issuer: AUTH0_ISSUER,
        },
    },
};
exports.default = CONFIG[ENV];
