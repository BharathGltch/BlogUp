"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Secret = "My-Secret";
function authMiddleware(req, res, next) {
    console.log("Inside the middleware");
    let token = req.headers["token"];
    if (token == undefined) {
        res.status(404).json({ status: false });
        return;
    }
    token = token.split(" ")[1];
    console.log("token after splitting is " + token);
    jsonwebtoken_1.default.verify(token, Secret, {}, (err, data) => {
        if (err) {
            console.log("an error occured");
            return res.status(404).json({ status: false, message: "Invalid token" });
        }
        if (data == undefined) {
            console.log("Undefined");
            return res.status(404).json({ status: false, message: "Invalid token" });
        }
        data = data;
        req.username = data.userid;
        req.userid = data.userid;
    });
    next();
}
exports.authMiddleware = authMiddleware;
