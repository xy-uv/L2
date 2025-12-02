import { Application, Request, Response } from "express";
import { UserServices } from "./user.service";

const create = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.create(req.body);
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
      message: error?.message,
    });
  }
};

const read = async (_req: Request, res: Response) => {
  try {
    const result = await UserServices.read();
    res.status(200).json({
      success: true,
      response: "ok",
      message: "Users retrieve successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
};

const single = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.single(req.params.id!);
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        response: "ok",
        message: "Data retrieve successfully!!",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "User not found",
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

const update = async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  try {
    const result = await UserServices.update(req.body, req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "User not found",
      });
    } else {
      res.status(201).json({
        success: true,
        response: "ok",
        message: "User updated successfully",
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

const remove = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.remove(req.params.id!);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
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

export const UserControllers = { create, read, single, update, remove };
