import express, { Application, Request, Response } from "express";
import cors from "cors";
import { variables } from "./config";

const app: Application = express();

//! Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  console.log("bal");
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

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    response: "wrong",
    message: "Requested URL not found!!",
    url: req.path,
  });
});

app.listen(variables.port, () => {
  console.log(`Server is listening on port ${variables.port}`);
});
