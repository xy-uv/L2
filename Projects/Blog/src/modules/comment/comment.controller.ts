import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const insert = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await CommentService.insert(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Comment creation failed",
      details: error,
    });
  }
};

const retrieve = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await CommentService.retrieve(commentId as string);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Comment fetched failed",
      details: e,
    });
  }
};

const retrieveByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await CommentService.retrieveByAuthor(authorId as string);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Comment fetched failed",
      details: e,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await CommentService.destroy(
      commentId as string,
      user?.id as string
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Comment delete failed!",
      details: e,
    });
  }
};

const modify = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await CommentService.modify(
      commentId as string,
      req.body,
      user?.id as string
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Comment update failed!",
      details: e,
    });
  }
};

const moderateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await CommentService.moderateComment(commentId!);

    res.status(200).json(result);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Comment update failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

export const CommentController = {
  insert,
  retrieve,
  retrieveByAuthor,
  destroy,
  modify,
  moderateComment,
};
