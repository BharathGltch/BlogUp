"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const blogcommon_1 = require("@bharath_ch/blogcommon");
const auth_1 = require("../db/auth");
const body_parser_1 = __importDefault(require("body-parser"));
const initConn_1 = require("../db/initConn");
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const Secret = "My-Secret";
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use((0, cors_1.default)());
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside the signup route");
    console.log("the body is " + req.body);
    let resultParse = blogcommon_1.signupInput.safeParse(req.body);
    if (!resultParse.success) {
        res.status(422).json({ message: "error" });
    }
    let username = req.body.username;
    let password = req.body.password;
    try {
        let query = "Insert into users(username,password) VALUES ($1,$2);";
        yield initConn_1.db.none(query, [username, password]);
        initConn_1.pgp.end();
        let token = jsonwebtoken_1.default.sign({ username: username }, Secret, { expiresIn: "1h" });
        res.status(201).json({
            status: true,
            token: token,
            message: "Signup Successful",
        });
    }
    catch (ex) {
        res.status(404).json({
            status: false,
            message: "Something went wrong",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultParse = blogcommon_1.signupInput.safeParse(req.body);
    console.log("body is" + JSON.stringify(req.body));
    console.log(resultParse);
    if (!resultParse.success) {
        res.status(400).json({ status: false, message: "Input Type Invalid" });
        return;
    }
    else {
        const { username, password } = resultParse.data;
        let user = yield (0, auth_1.authenticateUserPrisma)(username, password);
        if (user == null) {
            return res
                .status(404)
                .json({ status: false, message: "Username or password incorrect" });
        }
        let token = jsonwebtoken_1.default.sign({ userid: user.userid, username: user.username }, Secret, {
            expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        res
            .status(201)
            .json({ status: true, token: token, message: "Login Successful" });
    }
}));
router.get("/me", authMiddleware_1.authMiddleware, (req, res) => {
    res.status(200).json({ username: req.username });
});
exports.default = router;
