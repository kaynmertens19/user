import { Router } from "express";
import {privateRequest, publicRequest} from "../controllers/request.controller"
import checkJwtDTO from "../dto/check-jwt.dto"
import userRouter from "./user.routes";


export const requestRouterPublic = Router();
export const requestRouterPrivate = Router();

requestRouterPublic.get("/public", publicRequest, userRouter)
requestRouterPrivate.get("/protected", checkJwtDTO, privateRequest)