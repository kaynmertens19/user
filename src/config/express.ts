import express from "express";
import userRouter from "../routes/user.routes";
import movieRouter from "../routes/moovie.routes";
import { requestRouterPrivate, requestRouterPublic } from "../routes/request.routes";
const cors = require("cors");


const app = express();

// Middlewares

app.use(express.json());
app.use(cors());
// Rourtes
app.use("/api", requestRouterPublic)
app.use("/api", requestRouterPrivate)

export default app;