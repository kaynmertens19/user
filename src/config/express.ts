import express from "express";
import userRouter from "../routes/user.routes";
import movieRouter from "../routes/moovie.routes";


const app = express();

// Middlewares

app.use(express.json());

// Rourtes
app.use("/user", userRouter)
app.use("/movie", movieRouter)


export default app;