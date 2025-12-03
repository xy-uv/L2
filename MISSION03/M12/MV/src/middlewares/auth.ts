import { NextFunction, Request, Response } from "express";
import { jwts } from "../utils/jwts";
import { variables } from "../config";

/**
 *! Authentication & Authorization Middleware
 *
 * @param roles - Optional array of roles allowed to access the route
 *                If empty, only verifies the token (authentication only)
 *                If provided, also checks role-based access (authorization)
 *
 * @example
 * router.get('/admin', auth('admin'), adminController);
 * router.get('/profile', auth(), userController); // Any authenticated user
 */
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //? 1. Extract token from Authorization header (Bearer <token>)
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided.",
        });
      }

      //? 2. Verify JWT token
      let decodedPayload;
      try {
        decodedPayload = jwts.verifyToken(token, variables.jwt_secret);
      } catch (err: any) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token has expired. Please log in again.",
          });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            success: false,
            message: "Invalid token. Authentication failed.",
          });
        }
        throw err; //! Unexpected error
      }

      //? 3. Attach decoded user to request object
      req.user = decodedPayload;

      //? 4. Role-based authorization (if roles are specified)
      if (roles.length > 0) {
        if (!decodedPayload.role || !roles.includes(decodedPayload.role)) {
          return res.status(403).json({
            success: false,
            message:
              "Forbidden: You do not have permission to access this resource.",
          });
        }
      }

      //? 5. Proceed to the next middleware/controller
      next();
    } catch (error: any) {
      //? Catch-all for unexpected errors
      console.error("Auth middleware error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during authentication.",
      });
    }
  };
};

export default auth;
