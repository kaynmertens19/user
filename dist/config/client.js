"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.postgresClient = exports.mongoClient = void 0;
const mongodb_client_1 = require("../../prisma/generated/mongodb_client");
const postgresql_client_1 = require("../../prisma/generated//postgresql_client");
const DATA_SOURCE = process.env.DATA_SOURCE;
exports.mongoClient = new mongodb_client_1.PrismaClient();
exports.postgresClient = new postgresql_client_1.PrismaClient();
if (DATA_SOURCE === "postgres") {
    exports.prismaClient = exports.postgresClient;
}
else {
    exports.prismaClient = exports.mongoClient;
}
