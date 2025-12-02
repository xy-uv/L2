import { TodoServices } from "./todo.service";
import { Request, Response } from "express";

const insert = async (req: Request, res: Response) => {
  try {
    const result = await TodoServices.insert(req.body);
    res.status(201).json({
      success: true,
      response: "ok",
      message: "Data inserted successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error.message,
    });
  }
};

const retrieves = async (_req: Request, res: Response) => {
  try {
    const result = await TodoServices.retrieves();
    res.status(200).json({
      success: true,
      response: "ok",
      message: "TODOS retrieve successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error.message,
    });
  }
};

const retrieve = async (req: Request, res: Response) => {
  try {
    const result = await TodoServices.retrieve(req.params.id!);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        response: "wrong",
        message: "Single TODO retrieve successfully!",
      });
    }
    res.status(200).json({
      success: true,
      response: "ok",
      message: "Single TODO retrieve successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error.message,
    });
  }
};

const modify = async (req: Request, res: Response) => {
  try {
    const result = await TodoServices.modify(req.body, req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "TODOS not found",
      });
    } else {
      res.status(201).json({
        success: true,
        response: "ok",
        message: "TODOS updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await TodoServices.destroy(req.params.id!);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "TODOS not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "TODOS deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
};
export const TodoControllers = {
  insert,
  retrieves,
  retrieve,
  modify,
  destroy,
};
