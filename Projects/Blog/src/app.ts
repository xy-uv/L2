import express, { Application, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import authentic from "./middlewares/auth";
import { auth } from "./lib/auth";
import { Role } from "./const/auth.constrain";
import { PostRouter } from "./modules/post/post.router";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/v1", PostRouter);

app.get(
  "/",
  authentic(Role.user, Role.admin),
  (req: Request, res: Response) => {
    res.json(req.user);
  }
);

export default app;
