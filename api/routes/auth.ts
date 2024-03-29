import jwt from "jsonwebtoken";
import express from "express";
import { signupInput } from "@bharath_ch/blogcommon";
import pgPromise from "pg-promise";
import { authenticateUser, authenticateUserPrisma } from "../db/auth";
import bodyParser from "body-parser";
import { pgp, db } from "../db/initConn";
import cors from "cors";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const Secret = "My-Secret";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());

router.post("/signup", async (req, res) => {
  console.log("Inside the signup route");
  console.log("the body is " + req.body);
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
    res.status(201).json({
      status: true,
      token: token,
      message: "Signup Successful",
    });
  } catch (ex) {
    res.status(404).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

router.post("/signin", async (req, res) => {
  let resultParse = signupInput.safeParse(req.body);
  console.log("body is" + JSON.stringify(req.body));
  console.log(resultParse);
  if (!resultParse.success) {
    res.status(400).json({ status: false, message: "Input Type Invalid" });
    return;
  } else {
    const { username, password } = resultParse.data;
    let user = await authenticateUserPrisma(username, password);
    if (user == null) {
      return res
        .status(404)
        .json({ status: false, message: "Username or password incorrect" });
    }
    let token = jwt.sign(
      { userid: user.userid, username: user.username },
      Secret,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res
      .status(201)
      .json({ status: true, token: token, message: "Login Successful" });
  }
});

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ username: req.username });
});

export default router;
