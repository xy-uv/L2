import { Request, Response } from "express";
import { PostServices } from "./post.service";
import { PostStatus } from "../../generated/prisma/enums";
import { paginationSortingHelpers } from "../../helpers/pagination.sorting.helpers";
import { Role } from "../../const/auth.constrain";

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
    const search = req.query.search;
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelpers(
      req.query
    );

    const result = await PostServices.retrieves({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const retrieve = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.retrieve(req.params.postId!);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const myPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    console.log("User data: ", user);
    const result = await PostServices.myPosts(user.id);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Post fetched failed",
      details: e,
    });
  }
};

const modify = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { postId } = req.params;
    const isAdmin = user.role === Role.admin;
    const result = await PostServices.modify(
      postId as string,
      req.body,
      user.id,
      isAdmin
    );
    res.status(200).json(result);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Post update failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { postId } = req.params;
    const isAdmin = user.role === Role.admin;
    const result = await PostServices.destroy(
      postId as string,
      user.id,
      isAdmin
    );
    res.status(200).json(result);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Post delete failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

const stats = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.stats();
    res.status(200).json(result);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Stats fetched failed!";
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

export const PostController = {
  insert,
  retrieves,
  retrieve,
  myPosts,
  modify,
  destroy,
  stats,
};
