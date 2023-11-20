import express from "express";
import userRouter from "../routes/user.routes";
import movieRouter from "../routes/moovie.routes";
import { requestRouterPrivate, requestRouterPublic } from "../routes/request.routes";
const cors = require("cors");


const app = express();



app.use(express.json());
app.use(cors());

app.use("/movie", movieRouter)
app.use("/user", userRouter)

export default app;