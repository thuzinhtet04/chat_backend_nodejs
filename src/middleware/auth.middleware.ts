import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select("-password");
    console.log("user",user , decoded)
    if (!user) return res.status(404).json({ message: "User  not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(
      "Error in protected route middleware",
      (error as Error).message,
    );
    return res.status(401).json({ message: "Unauthorized" });
  }
};
