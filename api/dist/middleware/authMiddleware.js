"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Secret = "My-Secret";
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (token == null) {
        res.status(404).json({ status: false });
    }
    jsonwebtoken_1.default.verify(token, Secret, {}, (err, data) => {
        if (err) {
            res.status(404).json({ message: "Invalid token" });
        }
        res.status(200).json({ username: data });
    });
    next();
}
exports.authMiddleware = authMiddleware;
