import { Request, Response, NextFunction } from "express";
import { pgp, db } from "../db/initConn";
import jwt, { JwtPayload } from "jsonwebtoken";

const Secret = "My-Secret";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Inside the middleware");
  let token = req.headers["token"] as string;

  if (token == undefined) {
    res.status(404).json({ status: false });
    return;
  }
  token = token.split(" ")[1];
  console.log("token after splitting is " + token);
  jwt.verify(token, Secret, {}, (err, data) => {
    if (err) {
      console.log("an error occured");
      return res.status(404).json({ status: false, message: "Invalid token" });
    }
    if (data == undefined) {
      console.log("Undefined");
      return res.status(404).json({ status: false, message: "Invalid token" });
    }
    data = data as JwtPayload;
    req.username = data.userid;
    req.userid = data.userid;
  });
  next();
}

export { authMiddleware };
