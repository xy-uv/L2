import express, { Application, Request, Response } from "express";
import cors from "cors";
import dbConnection, { pool } from "./config/db";
import router from "./routes";

const app: Application = express();

//! Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

//! Calling routes
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    response: "ok",
    message: "Server is Running for SERVE!!",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    response: "ok",
    message: "Server health is Great!!",
  });
});

//! Handling 404-> not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    response: "wrong",
    message: "Requested URL not found!!",
    url: req.path,
  });
});

export default app;
