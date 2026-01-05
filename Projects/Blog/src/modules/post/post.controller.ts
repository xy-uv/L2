import { Request, Response } from "express";
import { PostServices } from "./post.service";

const insert = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "You are unauthorized!",
      });
    }
    const result = await PostServices.insert(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const retrieves = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.retrieves();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

export const PostController = { insert, retrieves };
