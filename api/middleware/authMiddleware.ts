import { Request, Response, NextFunction } from "express";
import { pgp, db } from "../db/initConn";
import jwt from "jsonwebtoken";

const Secret = "My-Secret";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.get("token")?.split(",")[1];
  if (token == undefined) {
    res.status(404).json({ status: false });
    return;
  }
  jwt.verify(token, Secret, {}, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Invalid token" });
    }
    if (data == undefined) {
      res.status(404).json({ message: "Invalid token" });
      return;
    }
    req.username = data;
  });
  next();
}

export { authMiddleware };
