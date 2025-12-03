import { NextFunction, Request, Response } from "express";
import { jwts } from "../utils/jwts";
import { variables } from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Token expected!");
      }
      const verifiedUser = jwts.verifyToken(token, variables.jwt_secret);
      //* Wrapping req.user= jwtPayload
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("Forbidden access!");
      }
      next();
    } catch (error: any) {
      res.status(403).json({
        success: false,
        response: "wrong",
        message: error?.message,
      });
    }
  };
};

export default auth;
