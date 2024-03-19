import jwt from "jsonwebtoken";
import express from "express";
import { signupInput } from "@bharath_ch/blogcommon";
import pgPromise from "pg-promise";
import authenticateUser from "../db/auth";
import bodyParser from "body-parser";
import { pgp, db } from "../db/initConn";
import cors from "cors";

const router = express.Router();
const Secret = "My-Secret";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());

router.post("/signup", async (req, res) => {
  let resultParse = signupInput.safeParse(req.body);
  if (!resultParse.success) {
    res.status(422).json({ message: "error" });
  }

  let username: string = req.body.username;
  let password: string = req.body.password;

  try {
    let query: string = "Insert into users(username,password) VALUES ($1,$2);";
    await db.none(query, [username, password]);
    pgp.end();
    let token = jwt.sign({ username: username }, Secret, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: false,
    });
    res.status(201).json({
      message: "Signup Successful",
    });
  } catch (ex) {
    res.status(404).json({
      message: "Something went wrong",
    });
  }
});

router.post("/signin", async (req, res) => {
  let resultParse = signupInput.safeParse(req.body);
  console.log("body is" + JSON.stringify(req.body));
  console.log(resultParse);
  if (!resultParse.success) {
    res.status(404).json({ message: "Input Type Invalid" });
    return;
  } else {
    const { username, password } = resultParse.data;
    let user = await authenticateUser(username, password);
    if (user == null) {
      return res
        .status(404)
        .json({ status: false, message: "Username or password incorrect" });
    }
    let token = jwt.sign({ username: user.username }, Secret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ status: true, message: "Login Successful" });
  }
});

export default router;
