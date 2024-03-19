import express from "express";
import pgPromise from "pg-promise";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";

const Secret = "My-Secret";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const port = 3000;

app.post("/test", (req, res) => {
  return res.status(200).json({ message: "Hello" });
});
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
