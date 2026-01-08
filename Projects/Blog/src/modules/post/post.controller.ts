import { Request, Response } from "express";
import { PostServices } from "./post.service";
import { PostStatus } from "../../generated/prisma/enums";
import { paginationSortingHelpers } from "../../helpers/pagination.sorting.helpers";

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

export const PostController = { insert, retrieves, retrieve };
