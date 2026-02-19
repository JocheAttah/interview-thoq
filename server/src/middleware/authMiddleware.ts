import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Extend the Request interface to include 'user'
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  // 1. Check if the header starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get the token from the string "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret123",
      );

      // 4. Find the user in DB and attach to req.user
      // (-password means "don't include the password in the result")
      req.user = await User.findById(decoded.id).select("-password");

      // 5. Move to the next function (The Controller)
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
