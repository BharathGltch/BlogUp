import { JwtPayload } from "jsonwebtoken";

declare global {
  declare namespace Express {
    export interface Request {
      username?: string | JwtPayload;
    }
  }
}
