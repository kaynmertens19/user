import express from "express";
import userRouter from "../routes/user.routes";

const app = express();

// Middlewares

app.use(express.json());

// Rourtes
app.use("/user", userRouter)

export default app;