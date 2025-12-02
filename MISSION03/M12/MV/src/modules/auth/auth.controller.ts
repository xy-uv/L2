import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await AuthServices.login(email, password);
    res.status(200).json({
      success: true,
      response: "ok",
      message: "User logged in success!",
      token: result.token,
      data: result.user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
};

export const AuthController = { login };
