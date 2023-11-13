import express from "express";
import userRouter from "../routes/user.routes";
import movieRouter from "../routes/moovie.routes";
import genreRouter from "../routes/genre.routes";

const app = express();

// Middlewares

app.use(express.json());

// Rourtes
app.use("/user", userRouter)
app.use("/movie", movieRouter)

app.use("/genre", genreRouter);

export default app;