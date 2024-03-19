import { Request, Response, NextFunction } from "express";
import { pgp, db } from "../db/initConn";
import jwt from "jsonwebtoken";

const Secret = "My-Secret";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (token == null) {
    res.status(404).json({ status: false });
  }
  jwt.verify(token, Secret, {}, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Invalid token" });
    }
    res.status(200).json({ username: data });
  });
  next();
}

export { authMiddleware };
