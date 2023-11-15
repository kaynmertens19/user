import { PrismaClient as MongoClient } from "../../prisma/generated/mongodb_client"
import { PrismaClient as PostgresClient } from "../../prisma/generated//postgresql_client"
import { Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const DATA_SOURCE = process.env.DATA_SOURCE;
export const mongoClient = new MongoClient();
export const postgresClient = new PostgresClient();


export let prismaClient : any

if (DATA_SOURCE === "postgres") {
    prismaClient = postgresClient
}else {
    prismaClient = mongoClient
}