import express, { Application } from "express";
import cors from "cors";
import userRouter from "./routers/user.router";
import postRouter from "./routers/post.router";

const app: Application = express();

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
