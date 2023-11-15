import express from "express";
import userRouter from "../routes/user.routes";
import movieRouter from "../routes/moovie.routes";
const cors = require("cors");


const app = express();

// Middlewares

app.use(express.json());
app.use(cors());
// Rourtes
app.use("/user", userRouter)
app.use("/movie", movieRouter)


export default app;